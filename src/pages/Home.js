import React from 'react';
import { Link } from 'react-router-dom';
// https://github.com/walking-sunset/selection-task

function Home() {
  return (
    <div className="home container">
      <div>
        <Link to={'/todo'}>
          <button>Todo List</button>
        </Link>
        <Link to={'/signin'}>
          <button>로그인</button>
        </Link>
        <Link to={'/signup'}>
          <button>회원가입</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
