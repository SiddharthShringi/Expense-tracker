import React, { Component } from "react";
import { connect } from 'react-redux'
import { fetchUserDataAction } from "../../store/actions/fetchUserDataAction";

class DataDashboard extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUserDataAction());
  }

  render() {
    return <div className="dashboard" />;
  }
}


export default connect()(DataDashboard);
