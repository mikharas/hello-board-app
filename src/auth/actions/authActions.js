const axios = require("axios");

export const register = (username, password) => async (dispatch) => {
  try {
    let res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_BACKEND_URL}/api/users/signup`,
      data: {
        account_name: username,
        password,
      },
    });

    localStorage.setItem("user", JSON.stringify(res.data));
    dispatch({
      type: "REGISTER_SUCCESS",
      payload: {
        user: {
          account_name: res.data.account_name,
          userId: res.data.userId,
          accessToken: res.data.accessToken,
        },
      },
    });
  } catch (error) {
    alert(error.response.data.message); // this is the main part. Use the response property from the error object
    return error.response;
  }
};

export const login = (username, password) => async (dispatch, getState) => {
  try {
    let res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
      data: {
        username,
        password,
      },
    });

    let data = res.data;
    localStorage.setItem("user", JSON.stringify(res.data));
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        user: {
          account_name: res.data.account_name,
          userId: res.data.userId,
          accessToken: res.data.accessToken,
        },
      },
    });
    return data;
  } catch (error) {
    alert("incorrect password or username");
    dispatch({
      type: "LOGIN_FAIL",
    });
    return error.response;
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("user");
  dispatch({
    type: "LOGOUT",
  });
};
