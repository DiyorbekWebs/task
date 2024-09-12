import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
      });
      localStorage.setItem('authToken', response.data.token);
      console.log('Token saved:', response.data.token);

      window.location.reload()
      navigate('/products');
    } catch (error) {
      setErrorMessage('Login failed, please check your credentials.');
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Auth;
