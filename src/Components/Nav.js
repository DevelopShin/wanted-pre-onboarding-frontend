import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Nav() {
  const isAuth = localStorage.getItem('access_token');
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('access_token');
    navigate('/', { replace: true });
  };
  return (
    <nav className="navbar">
      <Link to="/">
        <h1>TODO</h1>
      </Link>
      {isAuth && <button onClick={logout}>로그아웃</button>}
    </nav>
  );
}

export default Nav;
