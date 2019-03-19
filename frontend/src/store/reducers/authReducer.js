const initState = {
  username: null,
	email: null,
};

const authReducer = (state = initState, action) => {
	switch(action.type){
		case "SIGNUP_SUCCESS":
			return {...state, username:action.username, email:action.email}
		default:
		return state
	}
};

export default authReducer;
