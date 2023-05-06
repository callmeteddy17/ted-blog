import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from './UserContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useUserContext();

  const login = async (e) => {
    e.preventDefault();
    const respone = await fetch(`${import.meta.env.VITE_SOME_KEY_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (respone.ok) {
      respone.json().then((userInfo) => {
        document.cookie = `token=${userInfo.token};Path=/;`;
        setUserInfo(userInfo);
        setRedirect(true);
      });
    }
    if (respone.status === 401) {
      alert('Wrong Email');
      setEmail('');
      setPassword('');
    }
    if (respone.status === 400) {
      alert('Wrong Password');
      setPassword('');
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="login-main">
      <h2>Login</h2>
      <form className="register" onSubmit={login}>
        <label htmlFor="email">User Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="text"
          placeholder="Email..."
        />
        <label htmlFor="user-password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="user-password"
          type="password"
          placeholder="Password..."
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
