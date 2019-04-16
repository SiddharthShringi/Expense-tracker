import axios from "axios";

export const fetchUserCategory = () => {
  return dispatch => {
    fetch("http://127.0.0.1:8000/api/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("expense-jwt")
      }
    })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: "FETCH_USER_CATEGORY",
          data
        });
      });
  };
};
