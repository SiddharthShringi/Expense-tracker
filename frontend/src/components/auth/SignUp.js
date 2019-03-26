import React, { Component } from "react";
import { connect } from "react-redux";

import { signUp } from '../../store/actions/authActions'

class SignUp extends Component {
  state = {
    username: "",
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
		e.preventDefault()
		var {username, email, password} = this.state;
		var user = {
			username,
			email,
			password
		}
		this.props.dispatch(signUp(user, (response, err) => {
			if (response){
				console.log('success')
			} else {
				this.setState({
					error: err
				})
			}
		}))
		this.props.history.push('/')
	}

  render() {
		const {error} = this.state
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
						<div className="error">
							{error.username ? <p>Username: {error.username[0]}</p> : null}
							{error.email ? <p>Email: {error.email[0]}</p> : null}
							{error.password ? <p>Password: {error.password[0]}</p> : null}
						</div>
					</div>
        </form>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		signUp: newUser => dispatch(signUp(newUser))
// 	}
// }

export default connect()(SignUp);
