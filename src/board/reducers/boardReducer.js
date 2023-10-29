const initialBoardData = {
  selectedColumn: null,
  title: '',
  columnOrder: [],
};

const boardReducer = (state = initialBoardData, { type, payload }) => {
  const newColumnOrder = [...state.columnOrder];
  switch (type) {
    case 'SET_BOARD_DATA':
      return {
        title: payload.title,
        columnOrder: payload.columnOrder,
        selectedColumn: payload.selectedColumn,
      }

    case 'CHANGE_TITLE':
      return {
        ...state,
        title: payload,
      };

    case 'ADD_COLUMN':
      if (!payload.columnId) {
        newColumnOrder.push(payload.insertAfter);
      } else {
        const index = newColumnOrder.indexOf(payload.columnId) + 1;
        newColumnOrder.splice(index, 0, payload.insertAfter);
      }
      return {
        ...state,
        columnOrder: newColumnOrder,
      };
    case 'DEL_COLUMN':
      const newState = {
        ...state,
        columnOrder: state.columnOrder.filter(columnId => payload !== columnId),
      };
      return newState;

    case 'SWAP_COLUMNS':
      const col_1_index = state.columnOrder.indexOf(payload.col_1);
      const col_2_index = state.columnOrder.indexOf(payload.col_2);
      const save = newColumnOrder[col_1_index];
      newColumnOrder[col_1_index] = newColumnOrder[col_2_index];
      newColumnOrder[col_2_index] = save;
      return {
        ...state,
        columnOrder: newColumnOrder,
      };

    case 'SET_SELECTED_COLUMN':
      return {
        ...state,
        selectedColumn: payload,
      };

    default:
      return state;
  }
};

export default boardReducer;
