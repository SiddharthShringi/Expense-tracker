export const signUp = newUser => {
  return dispatch => {
    fetch("http://127.0.0.1:8000/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({user:newUser})
    }).then(res => res.json()).then(data => console.log(data) )
  }
};

