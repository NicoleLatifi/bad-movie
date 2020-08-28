import React from 'react';
import './Header.css';
import badLogo from '../badlogo.png';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ currentUser, logoutUser }) => {
  return (
    <header className='header'>
      <img src={badLogo} alt='Bad Movie Logo' height='50' width='50' />
      {currentUser && <h2>Hello {currentUser.name}</h2>}
      {currentUser && (
        <button className='logout-button' onClick={logoutUser}>
          Logout
        </button>
      )}
      {!currentUser && (
        <Link to='/login'>
          <button className='login-button'>Login</button>
        </Link>
      )}
    </header>
  );
};

export default Header;

Header.propTypes = {
  logoutUser: PropTypes.func,
}
