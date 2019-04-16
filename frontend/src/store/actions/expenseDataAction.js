export const expenseDataAction = (expenseData, cb) => {
  console.log('expense_data', expenseData)
  return dispatch => {
    fetch("http://127.0.0.1:8000/api/expense/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("expense-jwt")
      },
      body: JSON.stringify(expenseData)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        cb(true);
      });
  };
};
