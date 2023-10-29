import * as R from "ramda";
import authHeader from "../../services/authHeader";
import isExpired from "../../services/checkAuthExpiry";

const axios = require("axios");
const api = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const setUserBoardsData = (data) => ({
  type: "SET_USER_BOARDS_DATA",
  payload: data,
});

export const addBoard = (boardData) => ({
  type: "ADD_BOARD",
  payload: boardData,
});

export const delBoard = (id) => ({
  type: "DEL_BOARD",
  payload: { id },
});

export const getUserBoardsData = (userId) => async (dispatch) => {
  if (isExpired()) {
    dispatch({
      type: "LOGOUT"
    })
    alert("Your session has ended and was logged out.")
    return;
  }
  dispatch({
    type: "SET_LOADING",
    payload: true,
  });
  await axios
    .get(`${api}/boards/user/${userId}`, { headers: authHeader() })
    .then((response) => {
      const idToBoard = R.groupBy(
        (boardData) => boardData.id,
        response.data.boards
      );
      Object.keys(idToBoard).forEach((id) => {
        idToBoard[id] = idToBoard[id][0];
      });
      dispatch(setUserBoardsData(idToBoard));
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    });
};

export const postUserBoard = (userId) => (dispatch) => {
  if (isExpired()) {
    dispatch({
      type: "LOGOUT"
    })
    alert("Your session has ended and was logged out.")
    return;
  }
  axios
    .post(
      `${api}/boards/`,
      JSON.stringify({
        creator: userId,
        title: "New Board",
      }),
      { headers: authHeader() }
    )
    .then((response) => {
      dispatch(addBoard(response.data.board));
    });
};

export const delUserBoard = (boardId, token) => (dispatch) => {
  if (isExpired()) {
    dispatch({
      type: "LOGOUT"
    })
    alert("Your session has ended and was logged out.")
    return;
  }
  axios
    .delete(`${api}/boards/${boardId}`, { headers: authHeader() })
    .then(() => {
      dispatch(delBoard(boardId));
    });
};
