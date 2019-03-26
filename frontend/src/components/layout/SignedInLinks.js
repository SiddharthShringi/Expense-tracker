import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux'

import { withRouter } from 'react-router'

import { signOut } from '../../store/actions/authActions'

class SignedInLinks extends Component {
  constructor(props){
    super(props)
  }
  handleClick = () => {
    this.props.dispatch(signOut(() => {
      this.props.history.push('/')
    }))
  }

  render() {
    console.log(this.props)
    return (
      <ul className="signedIn-links">
        <li><NavLink to='/add expense'>Add Expense</NavLink></li>
        <li><a onClick={this.handleClick}>Sign Out</a></li>
        <li>Dashboard</li>
      </ul>
    );
  }
};


export default withRouter(connect()(SignedInLinks));
