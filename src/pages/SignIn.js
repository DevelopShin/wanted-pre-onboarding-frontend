import React, { useCallback, useState, useEffect } from 'react';
import useInput from 'hooks/useInput';
import axios from 'axios';
import 'style/signPage.css';
import { Link, useNavigate } from 'react-router-dom';
function SignIn(props) {
  const [msg, setMsg] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [btnDisable, setBtnDisable] = useState(false);

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const navigate = useNavigate();
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!email.includes('@')) {
        setBtnDisable(true);
        setMsg('이메일 형식이 아닙니다');
        return;
      }
      if (password.length < 8) {
        setBtnDisable(true);
        setMsg('비밀번호는 8글자 이상이여야 합니다.');
        return;
      }
      await axios
        .post('api/auth/signin', {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.access_token) {
            localStorage.setItem('access_token', res.data.access_token);
            setAccessToken(res.data.access_token);
            navigate('/todo', { replace: true });
            axios.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${res.data.access_token}`;
          }
        })
        .catch((error) => setMsg(error.response.data.message));
    },
    [email, navigate, password],
  );

  useEffect(() => {
    setBtnDisable(false);
    setMsg('');
    if (email && !email.includes('@')) {
      setBtnDisable(true);
      setMsg('이메일 형식이 아닙니다');
    }
    if (password && password.length < 8) {
      setBtnDisable(true);
      setMsg('비밀번호는 8글자 이상이여야 합니다.');
    }
  }, [email, password]);

  return (
    <div className="sign-wrap">
      <h1>로그인</h1>

      <form onSubmit={onSubmit} className="wrapper-box">
        <input
          className="form-control form-control-email"
          data-testid="email-input"
          // type="email"
          value={email}
          onChange={onChangeEmail}
          placeholder="이메일"
          required
        />
        <input
          className="form-control form-control-password"
          data-testid="password-input"
          type="password"
          value={password}
          placeholder="비밀번호"
          onChange={onChangePassword}
          required
        />

        <label>{msg}</label>
        <div className="form-handler">
          <Link to={'/signup'}> SignUp</Link>
          <button
            data-testid="signin-button"
            disabled={btnDisable}
            className={btnDisable ? 'btn-disabled' : ''}
          >
            로그인
          </button>
        </div>
      </form>
    </div>
  );
}
export default SignIn;
