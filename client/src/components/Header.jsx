import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo3.png';
import top from '../assets/back-to-top.svg';
import logoutbtn from '../assets/logout.svg';
import create from '../assets/create.svg';
import { useUserContext } from './UserContext';

const Header = () => {
  const { setUserInfo, userInfo } = useUserContext();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SOME_KEY_URL}/profile`, {
      credentials: 'include',
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const logout = () => {
    document.cookie = 'token' + '=; Path=/;';
    location.reload();
  };

  const userName = userInfo?.user;

  return (
    <>
      <header>
        <Link to="/">
          <img src={logo} alt="logo" id="logo" /> <span>TedBlog</span>
        </Link>

        <div className="right-nav">
          {userName ? (
            <>
              <Link to={'/create'}>
                <img className="btn" src={create} alt="create new post" />{' '}
                <p className="create-new-post">Create New Post</p>
              </Link>
              <Link to="/">
                <b>{userName}</b>
              </Link>
              <img
                style={{ cursor: 'pointer' }}
                onClick={logout}
                className="btn"
                src={logoutbtn}
                alt="logout"
              />
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </header>
      <a href="#">
        <div id="to-top">
          <img width={'50%'} height={'50%'} src={top} alt="top" />
        </div>
      </a>
    </>
  );
};

export default Header;
