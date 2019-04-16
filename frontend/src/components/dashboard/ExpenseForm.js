import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'

import { expenseDataAction } from "../../store/actions/expenseDataAction";

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      expenseType: "Variable",
      category: (props.category) ? props.category[1].name : null,
      amount: "",
      note: ""
    };
  }

  handleOptionChange = e => {
    this.setState({
      expenseType: e.target.value
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    var { date, expenseType, category, amount, note } = this.state;
    var expenseData = {
      date,
      expenseType,
      category,
      amount,
      note
    };
    console.log(expenseData, "123")
    this.props.dispatch(
      expenseDataAction(expenseData, response => {
        if (response) {
          this.setState({
            date: "",
            expenseType: "Variable",
            category: "",
            amount: "",
            note: ""
          });
          console.log(this.history, 'expense form')
          this.props.history.push("/addExpense");
        } else {
          console.log("not happen");
        }
      })
    );
  };

  render() {
    const { category } = this.props;
    // if(!this.state.category){
    //   this.setState({
    //     category:category[0].name,
    //   })
    // }
    return (
      <div className="expense-form">
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="data">Date</label>
            <input value={this.state.date} type="date" id="date" onChange={this.handleChange} />
          </div>

          <div>
            <label htmlFor="expense-type">Expense-Type</label>
            <label>
              <input
                type="radio"
                value="Fixed"
                checked={this.state.expenseType === "Fixed"}
                onChange={this.handleOptionChange}
              />
              Fixed
            </label>
            <label>
              <input
                type="radio"
                value="Variable"
                checked={this.state.expenseType === "Variable"}
                onChange={this.handleOptionChange}
              />
              Variable
            </label>
          </div>

          <div>
            <label htmlFor="category">Category</label>
            <select id="category" onChange={this.handleChange} value={this.state.category} placeholder="Select Category">
              {category.map((obj, i) => {
                return (
                  <option value={obj.name} key={i}>
                    {obj.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              // min='0'
              value={this.state.amount}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <label htmlFor="note">Note</label>
            <input id="note" type="text" onChange={this.handleChange} />
          </div>

          <div>
            <button>Save</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(connect()(ExpenseForm));
