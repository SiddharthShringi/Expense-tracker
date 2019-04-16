import React, { Component } from "react";
import { connect } from "react-redux";

import ExpenseForm from "./ExpenseForm";
import IncomeForm from "./IncomeForm";
import { fetchUserCategory } from "../../store/actions/fetchUserCategory";

class AddExpense extends Component {
  state = {
    isIncomeClicked: false,
    isExpenseClicked: true
  };

  // handleClick = () => {
  // 	this.setState({
  // 		isIncomeClicked: !this.state.isIncomeClicked,
  // 		isExpenseClicked: !this.state.isExpenseClicked
  // 	})
  // }

  componentDidMount() {
    console.log("hello did mount", this.props);
    this.props.dispatch(fetchUserCategory());
  }

  handleClick = e => {
    if (e.target.id === "income") {
      this.setState({
        isIncomeClicked: true,
        isExpenseClicked: false
      });
    }
    if (e.target.id === "expense") {
      this.setState({
        isIncomeClicked: false,
        isExpenseClicked: true
      });
    }
  };

  render() {
    const { categoryData } = this.props;
    console.log(categoryData);
    if (categoryData) {
      const incomeCategory = categoryData.filter(
        category => category.category_type === "Income"
      );
      const expenseCategory = categoryData.filter(
        category => category.category_type === "Expense"
      );

      const { isExpenseClicked, isIncomeClicked } = this.state;
      let dataForm;

      if (isExpenseClicked) {
        dataForm = <ExpenseForm category={expenseCategory} />;
      }

      if (isIncomeClicked) {
        dataForm = <IncomeForm category={incomeCategory}/>;
      }
      return (
        <div className="add-data">
          <div className="header">
            <p id="income" onClick={this.handleClick}>
              Income
            </p>
            <p id="expense" onClick={this.handleClick}>
              Expense
            </p>
          </div>
          <div className="dataForm">{dataForm}</div>
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
}

const mapStateToProps = state => {
  // const { fetchCategory } = state
  return {
    categoryData: state.fetchCategory.userCategory
  };
};

export default connect(
  mapStateToProps,
  null
)(AddExpense);
