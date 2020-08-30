import React, { Component } from 'react';
import './Login.css';
import { loginUser } from '../Fetch';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      goHome: false,
    };
  }

  attemptLogin = (event) => {
  event.preventDefault();
  loginUser(this.state.username, this.state.password).then(({ data, error }) => {
    if (error) {
      this.setState({ error });
    } else {
      this.props.changeUser(data.user);
      this.setState({ goHome: true });
    }
  });
};

  updateForm = (event) => {
    const inputName = event.target.id;
    const inputValue = event.target.value;
    this.setState({ [inputName]: inputValue });
  };

  handleOutsideClick = () => {
    this.setState({ goHome: true });
  };

  render() {
    if (this.state.goHome) {
      return <Redirect to='/' />;
    }

    return (
      <div className='bg-login-modal' onClick={this.handleOutsideClick}>
        <form className='login-form' onClick={(e) => e.stopPropagation()} >
          <h3 className='login-header'>Login</h3>
          <label htmlFor='username' className='username'>
            username:
          </label>
          <input id='username' className='username-input' type='text' onChange={this.updateForm} />
          <label htmlFor='password' className='password'>
            password:
          </label>
          <input id='password' className='password-input' type='password' onChange={this.updateForm} />
          {this.state.error && <label className='invalid-alert hide'>{this.state.error}</label>}
          <button className='submit' aria-label='Submit' onClick={this.attemptLogin} >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  changeUser: PropTypes.func,
}
