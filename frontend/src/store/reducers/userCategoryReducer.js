const initState = {
  userCategory: null
};

const userCategoryReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_USER_CATEGORY":
      return { ...state, userCategory: action.data };

    default:
      return state;
  }
};

export default userCategoryReducer;
