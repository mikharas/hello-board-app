export const setSelectedTask = taskId => ({
  type: 'SET_SELECTED_TASK',
  payload: taskId,
});

export const setFilterStr = value => ({
  type: 'SET_FILTER_STR',
  payload: value,
});
