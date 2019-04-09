import React, { Component } from "react";

class ExpenseForm extends Component {
  render() {
    const { category } = this.props;
    return (
      <div className="income-form">
        <form>
          <div>
            <label htmlFor="data">Date</label>
            <input type="date" id="expense-date" />
          </div>

          <div>
            <label htmlFor="category">Category</label>
            <select>
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
            <input id="amount" type="number" min="0" />
          </div>

          <div>
            <label htmlFor="note">Note</label>
            <input id="note" type="text" />
          </div>

          <div>
            <button>Save</button>
          </div>
        </form>
      </div>
    );
  }
}

export default ExpenseForm;
