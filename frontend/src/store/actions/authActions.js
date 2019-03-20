export const signUp = (newUser, cb) => {
  return dispatch => {
    fetch("http://127.0.0.1:8000/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: newUser })
    })
      .then(res => res.json())
      .then(data => {
        if (!data.errors) {
          const token = data.user.token;
          const email = data.user.email;
          const username = data.user.username;

          localStorage.setItem("expense-jwt", `token ${token}`);
          dispatch({
            type: "SIGNUP_SUCCESS",
            email,
            username
          });
          cb(true);
        } else {
          const errors = data.errors
          cb(false, errors)
        }
      });
  };
};

export const singIn = (user, cb) => {
  return dispatch => {
    fetch("http://127.0.0.1:8000/api/users/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({user})
    })
      .then(res => res.json())
      .then(data => {
        if(!data.errors) {
          const token = data.user.token
          const email = data.user.email

          localStorage.setItem("expense-jwt", `token ${token}`);
          dispatch({
            type: "LOGIN_SUCCESS",
            email
          })
          cb(true)
        } else {
          const errors = data.errors
          cb(false, errors)
        }
      })
  }
}

export const signOut = (cb) => {
  localStorage.clear()
  cb()
  return {
    type: "SIGNOUT_USER"
  }
}
