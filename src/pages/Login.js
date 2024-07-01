// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1>Welcome back!</h1>
        <p>Enter your Credentials to access your account</p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <button className="forgot-password" onClick={() => alert('Password reset functionality coming soon!')}>Forgot password</button>
          </div>
          
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="separator">
          <span>Or</span>
        </div>
        <div className="social-login">
          <button className="google-button">
            <img src="/google.png" alt="Google" />
            Sign in with Google
          </button>
          <button className="apple-button">
            <img src="/apple-logo.png" alt="Apple" />
            Sign in with Apple
          </button>
        </div>
        <p className="signup-link">
          Don't have an account? <button onClick={() => navigate('/signup')}>Sign Up</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
