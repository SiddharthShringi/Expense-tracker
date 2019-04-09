import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SignUp from '../src/components/auth/SignUp'
import SignIn from '../src/components/auth/SignIn'
import Home from '../src/components/layout/Home'
import AddExpense from '../src/components/dashboard/AddExpense'
import './App.css';
import Navbar from './components/layout/Navbar';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/signUp' component={SignUp} />
            <Route path='/signIn' component={SignIn} />
            <Route path='/addExpense' component={AddExpense} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
