const userBoardsReducer = (state = {}, { type, payload }) => {
  const newState = { ...state };
  switch (type) {
    case 'SET_USER_BOARDS_DATA':
      return payload;

    case 'ADD_BOARD':
      return {
        ...state,
        [payload.id]: {
          ...payload,
        },
      };

    case 'DEL_BOARD':
      delete newState[payload.id];
      return newState;

    default:
      return state;
  }
};

export default userBoardsReducer;
