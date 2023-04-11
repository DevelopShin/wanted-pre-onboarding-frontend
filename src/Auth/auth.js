import React from 'react';

function Auth({ children, rule = 0 }) {
  // 0: 로그인 필요 없음
  // 1: 로그인 필요
  // 2: 로그인 유저 접근 금지""
  const isAuth = localStorage.getItem('access_token');

  if ('undefined' !== typeof window.document) {
    if (rule === 0) return children;

    if (rule === 1)
      if (isAuth) {
        return children;
      } else {
        return window.location.assign('signin');
      }

    if (rule === 2)
      if (!isAuth) {
        return children;
      } else {
        return window.location.assign('todo');
      }
  }
}

export default Auth;
