import React, { Component } from "react";
import { connect } from "react-redux";

class ExpenseForm extends Component {
  constructor() {
    super();
    this.state = {
      date: "",
      expenseType: "Variable",
      category: "",
      amount: null,
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

  render() {
    const { category } = this.props;
    return (
      <div className="expense-form">
        <form>
          <div>
            <label htmlFor="data">Date</label>
            <input type="date" id="expense-date" onChange={this.handleChange} />
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
            <select id="category" onChange={this.handleChange}>
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
              min="0"
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

export default connect()(ExpenseForm);
