export const incomeDataAction = (incomedata, cb) => {
  console.log("incomeData", incomedata);
  return dispatch => {
    fetch("http://127.0.0.1:8000/api/income/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("expense-jwt")
      },
      body: JSON.stringify(incomedata)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data, "resIncomeData");
        cb(true);
      });
  };
};
