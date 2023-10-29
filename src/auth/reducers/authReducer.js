const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user
      };
    case "REGISTER_FAIL":
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
