import React, { Component } from 'react';
import './Login.css';
import { loginUser } from '../Fetch';
import { Redirect } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      goHome: false
    };
  }

  attemptLogin = (event) => {
    event.preventDefault();
    loginUser(this.state.username, this.state.password).then(({ data, error }) => {
      if (error) {
        this.setState({ error });
      } else {
        this.props.changeUser(data.user);
        this.state.goHome = true;
      }
    });
  };


  updateForm = (event) => {
    const inputName = event.target.id;
    const inputValue = event.target.value;
    this.setState({ [inputName]: inputValue });
  };

  render() {
    if (this.state.goHome) {
      return <Redirect to='/' />
    }

    return (
      <div className='bg-login-modal' onClick={this.props.toggleLoginModal}>
        <form className='login-form' onClick={(e) => e.stopPropagation()} onSubmit={this.attemptLogin}>
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
          <button className='submit' aria-label='Submit'>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default Login;
