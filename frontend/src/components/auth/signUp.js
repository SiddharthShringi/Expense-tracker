import React, { Component } from "react";
import { connect } from "react-redux";

import { signUp } from '../../store/actions/authActions'

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
	};
	
	handleSubmit = e => {
		e.preventDefault()
		this.props.signUp(this.state)
	}

  render() {
    return (
      <div className="signUp">
        <form onSubmit={this.handleSubmit}>
          <h5>Sign Up</h5>

          <div>
						<label htmlFor="username">Username</label>
						<input type="text" id="username" onChange={this.handleChange} />
					</div>

					<div>
						<label htmlFor="email">Email</label>
						<input type="email" id="email" onChange={this.handleChange} />
					</div>

					<div>
						<label htmlFor="password">Password</label>
						<input type="password" id="password" onChange={this.handleChange} />
					</div>

					<div>
						<button>Signup</button>
						{/* <div className="error">
							{authError ? <p>{authError}</p> : null}
						</div> */}
					</div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		signUp: newUser => dispatch(signUp(newUser))
	}
}

export default connect(null, mapDispatchToProps)(SignUp);
