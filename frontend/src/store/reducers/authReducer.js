const initState = {
  username: null,
  email: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "SIGNUP_SUCCESS":
      return { ...state, username: action.username, email: action.email };

		case "LOGIN_SUCCESS":
		console.log("in red lin");
		
      return { ...state, email: action.email };

		case "SIGNOUT_USER":
			console.log("in red sout");
			
			return {...state, username:null, email:null}

    default:
      return state;
  }
};

export default authReducer;
