import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Data:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h1>Get Started Now</h1>
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          
          <button type="submit" className="signup-button">Signup</button>
          <div className="or-divider">Or</div>
          <div className="social-signup">
            <button className="google-signup">
              <img src="/google.png" alt="Google" />
              Sign in with Google
            </button>
            <button className="apple-signup">
              <img src="/apple-logo.png" alt="Apple" />
              Sign in with Apple
            </button>
          </div>
          <p className="signin-link">
            Have an account? <Link to="/login">Sign In</Link>
          </p>
        </form>
        <Link to="/dashboard" className="skip-button">Skip&gt;&gt;&gt;</Link>
      </div>
    </div>
  );
};

export default SignUp;