import React, { useCallback, useState, useEffect } from 'react';
import useInput from 'hooks/useInput';
import axios from 'axios';
import 'style/signPage.css';
import { Link, useNavigate } from 'react-router-dom';
// https://github.com/walking-sunset/selection-task
function SignUp(props) {
  const [msg, setMsg] = useState('');
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
        .post('api/auth/signup', {
          email: email,
          password: password,
        })
        .then((res) => (res.status === 201 ? navigate('/signin') : null))
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
      <h1>회원가입</h1>

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
        {/* <input
          className="form-control form-control-password"
          type="password"
          value={rePassword}
          placeholder="비밀번호 확인"
          onChange={onChangeRePassword}
          required
        /> */}
        <label>{msg}</label>
        <div className="form-handler">
          <Link to={'/signin'}> login</Link>
          <button
            data-testid="signup-button"
            disabled={btnDisable}
            className={btnDisable ? 'btn-disabled' : ''}
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}
export default SignUp;
