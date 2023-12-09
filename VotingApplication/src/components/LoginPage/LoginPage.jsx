import React, { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import './LoginPage.css';

const LoginPage = ({ onPageChange }) => {
  const { loginUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://65722fcad61ba6fcc0148256.mockapi.io/votingapp/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        loginUser(userData);
        onPageChange('voting'); // Redirect to the Voting Page after successful login
      } else {
        // Handle login error
        console.error('Login failed');
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error.message);
    }
  };

  return (
    <div className="center">
      <div className="ear ear--left"></div>
      <div className="ear ear--right"></div>
      <div className="face">
        <div className="eyes">
          <div className="eye eye--left">
            <div className="glow"></div>
          </div>
          <div className="eye eye--right">
            <div className="glow"></div>
          </div>
        </div>
        <div className="nose">
          <svg width="38.161" height="22.03">
            <path d="M2.017 10.987Q-.563 7.513.157 4.754C.877 1.994 2.976.135 6.164.093 16.4-.04 22.293-.022 32.048.093c3.501.042 5.48 2.081 6.02 4.661q.54 2.579-2.051 6.233-8.612 10.979-16.664 11.043-8.053.063-17.336-11.043z" fill="#243946"></path>
          </svg>
          <div className="glow"></div>
        </div>
        <div className="mouth">
          <svg className="smile" viewBox="-2 -2 84 23" width="84" height="23">
            <path d="M0 0c3.76 9.279 9.69 18.98 26.712 19.238 17.022.258 10.72.258 28 0S75.959 9.182 79.987.161" fill="none" stroke-width="3" stroke-linecap="square" stroke-miterlimit="3"></path>
          </svg>
          <div className="mouth-hole"></div>
          <div className="tongue breath">
            <div className="tongue-top"></div>
            <div className="line"></div>
            <div className="median"></div>
          </div>
        </div>
      </div>
      <div className="hands">
        <div className="hand hand--left">
          <div className="finger">
            <div className="bone"></div>
            <div className="nail"></div>
          </div>
          <div className="finger">
            <div className="bone"></div>
            <div className="nail"></div>
          </div>
          <div className="finger">
            <div className="bone"></div>
            <div className="nail"></div>
          </div>
        </div>
        <div className="hand hand--right">
          <div className="finger">
            <div className="bone"></div>
            <div className="nail"></div>
          </div>
          <div className="finger">
            <div className="bone"></div>
            <div className="nail"></div>
          </div>
          <div className="finger">
            <div className="bone"></div>
            <div className="nail"></div>
          </div>
        </div>
      </div>
      <div className="login">
          <div className="fa fa-phone"></div>
          <input
            className="Email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="fa fa-commenting"></div>
          <input
            className="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
