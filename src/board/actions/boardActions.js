import authHeader from "../../services/authHeader";
import axios from "axios";
import isExpired from "../../services/checkAuthExpiry";

export const setBoardData = (data) => ({
  type: "SET_BOARD_DATA",
  payload: data,
});

export const resetBoardData = () => ({
  type: "SET_BOARD_DATA",
  payload: {
    selectedColumn: null,
    title: "",
    columnOrder: [],
  },
});

export const changeTitle = (title) => ({
  type: "CHANGE_TITLE",
  payload: title,
});

export const addColumn = (columnId, insertAfter) => ({
  type: "ADD_COLUMN",
  payload: { columnId, insertAfter },
});

export const delColumn = (columnId) => ({
  type: "DEL_COLUMN",
  payload: columnId,
});

export const swapColumns = (col_1, col_2) => ({
  type: "SWAP_COLUMNS",
  payload: { col_1, col_2 },
});

export const setSelectedColumn = (columnId) => ({
  type: "SET_SELECTED_COLUMN",
  payload: columnId,
});

export const getData = (boardId) => async (dispatch, getState) => {
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
    .get(`${process.env.REACT_APP_BACKEND_URL}/api/boards/${boardId}`, {
      headers: authHeader(),
    })
    .then((res) => {
      dispatch(setBoardData(res.data.board));
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    });
};

export const saveData = (boardId) => async (dispatch, getState) => {
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
  const boardStructure = {
    ...getState().board,
    columns: {
      ...getState().columns,
    },
    tasks: {
      ...getState().tasks,
    },
    todoItems: {
      ...getState().todoItems,
    },
  };

  await axios
    .patch(
      `${process.env.REACT_APP_BACKEND_URL}/api/boards/${boardId}`,
      boardStructure,
      { headers: authHeader() }
    )
    .then(() => {
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    });
};
