import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const RegisterPage = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(null);

  const register = async (e) => {
    e.preventDefault();
    const respone = await fetch(
      `${import.meta.env.VITE_SOME_KEY_URL}/register`,
      {
        method: 'POST',
        body: JSON.stringify({ userName, password, email }),
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (respone.status === 200) {
      setPassword('');
      setUserName('');
      alert('Registration Successful');
      setRedirect(true);
    } else {
      setPassword('');
      setUserName('');
      alert('Registration Failed');
    }
  };

  if (redirect) {
    return <Navigate to={'/login'} />;
  }
  return (
    <div className="login-main" onSubmit={register}>
      <h2>Register</h2>
      <form className="login">
        <label htmlFor="user-mail">User Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="user-mail"
          type="text"
          placeholder="User Email..."
        />
        <label htmlFor="user-name">User Name</label>
        <input
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          id="user-name"
          type="text"
          placeholder="User Name..."
        />
        <label htmlFor="user-password">Password</label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          id="user-password"
          type="password"
          placeholder="Password..."
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
