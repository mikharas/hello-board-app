const eventReducer = (state = [], { type, payload }) => {
  switch (type) {
    case 'SET_EVENTS_DATA':
      return {
        ...payload.events,
      };
    default:
      return state;
  }
};

export default eventReducer;
