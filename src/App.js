//App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'style/style.css';
import Home from 'pages/Home';
import SignUp from 'pages/SignUp';
import SignIn from 'pages/SignIn';
import Todo from 'pages/Todo';
import Auth from 'Auth/auth';
import Nav from 'Components/Nav';
function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Nav />
        <Routes>
          <Route
            path="/"
            element={
              <Auth rule={0}>
                <Home />{' '}
              </Auth>
            }
          />
          <Route
            path="/todo"
            element={
              <Auth rule={1}>
                <Todo />
              </Auth>
            }
          />
          <Route
            path="signup"
            element={
              <Auth rule={2}>
                <SignUp />
              </Auth>
            }
          />
          <Route
            path="/signin"
            element={
              <Auth rule={2}>
                <SignIn />
              </Auth>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
