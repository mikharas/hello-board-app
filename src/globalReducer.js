const initialState = {
  selectedTask: null,
  isLoading: false,
  filterStr: '',
};

const globalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_SELECTED_TASK':
      return {
        ...state,
        selectedTask: payload,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: payload,
      };

    case 'SET_FILTER_STR':
      return {
        ...state,
        filterStr: payload,
      };

    default:
      return state;
  }
};

export default globalReducer;
