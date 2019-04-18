import axios from "axios";

const getIncomeData = () => {
  return axios.get("http://127.0.0.1:8000/api/expense/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("expense-jwt")
    }
  });
};

const getExpenseData = () => {
  return axios.get("http://127.0.0.1:8000/api/expense/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("expense-jwt")
    }
  });
};

export const fetchUserDataAction = () => {
  return dispatch => {
    axios.all([getIncomeData(), getExpenseData()]).then(
      axios.spread((incomeData, expenseData) => {
        dispatch({
          type: "FETCH_INCOME_DATA",
          payload: incomeData.data
        });
        dispatch({
          type: "FETCH_EXPENSE_DATA",
          payload: expenseData.data
        });
      })
    );
  };
};
