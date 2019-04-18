const initState = {
  expeseData: null,
  incomeData: null
};

const userDashboardReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_EXPENSE_DATA":
      return { ...state, expeseData: action.payload };

    case "FETCH_INCOME_DATA":
      return { ...state, incomeData: action.payload };

    default:
      return state;
  }
};


export default userDashboardReducer;