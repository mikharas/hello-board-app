export const changeTitle = (columnId, title) => ({
  type: 'CHANGE_COLUMN_TITLE',
  payload: { columnId, title },
});

export const moveTasksInColumn = (columnId, index1, index2) => ({
  type: 'MOVE_TASKS_IN_COLUMN',
  payload: { columnId, index1, index2 },
});

export const moveTaskBetweenColumn = (columnId1, columnId2, index1, index2, taskId) => ({
  type: 'MOVE_TASK_BETWEEN_COLUMN',
  payload: {
    columnId1, columnId2, index1, index2, taskId,
  },
});

export const addTask = (columnId, taskId, content = null) => ({
  type: 'ADD_TASK',
  payload: { columnId, taskId, content },
});

export const delTask = (columnId, taskId) => ({
  type: 'DEL_TASK',
  payload: { columnId, taskId },
});
