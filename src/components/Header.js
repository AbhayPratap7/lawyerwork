import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="date">July 14, 2023</div>
      <div className="user-info">
        <span>Dave Datta</span>
        {/* Add user icon here */}
      </div>
    </div>
  );
};

export default Header;
