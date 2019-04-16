import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { incomeDataAction } from "../../store/actions/incomeDataAction";

class IncomeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      category: props.category ? props.category[0].name : null,
      amount: "",
      note: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    var { date, category, amount, note } = this.state;
    var incomeData = {
      date,
      category,
      amount,
      note
    };
    console.log(incomeData, "IncomeForm");
    this.props.dispatch(
      incomeDataAction(incomeData, response => {
        if (response) {
          this.setState({
            date: "",
            category: "",
            amount: "",
            note: ""
          });
          this.props.history.push("/addExpense");
        } else {
          console.log("not happen");
        }
      })
    );
  };

  render() {
    const { category } = this.props;
    return (
      <div className="income-form">
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="data">Date</label>
            <input
              type="date"
              id="date"
              value={this.state.date}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              onChange={this.handleChange}
              value={this.state.category}
            >
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
              value={this.state.amount}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <label htmlFor="note">Note</label>
            <input
              id="note"
              type="text"
              value={this.state.note}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <button>Save</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(connect()(IncomeForm));
