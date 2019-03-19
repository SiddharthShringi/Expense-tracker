import React, { Component } from "react";
import { connect } from 'react-redux'

import { singIn } from "../../store/actions/authActions";


class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: {}
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    var { email, password } = this.state;
    var user = {
      email,
      password
    };
    this.props.dispatch(singIn(user));
  };

  render() {
    return (
      <div className="signIn">
        <form onSubmit={this.handleSubmit}>
          <h5>SignIn</h5>

          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange} />
          </div>

          <div>
            <button>SignIn</button>
            <div className="error" />
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(SignIn)