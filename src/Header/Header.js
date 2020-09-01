import React from 'react';
import './Header.css';
import badLogo from '../badlogo.png';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ currentUser, logoutUser }) => {
  return (
    <header className='header'>
      <img className='bad-logo' src={badLogo} alt='Bad Movie Logo' />
      {currentUser && <p className='welcome-message'>Hello {currentUser.name}</p>}
      {currentUser && (
        <Link to={'/favorites'}>
          <button className='favorites-button'>
            Favorites
          </button>
        </Link>
      )}
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
