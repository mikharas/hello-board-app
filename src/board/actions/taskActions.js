export const changeTitle = (taskId, newTitle) => ({
  type: 'CHANGE_TASK_TITLE',
  payload: { taskId, newTitle },
});

export const changeDescription = (taskId, newDescription) => ({
  type: 'CHANGE_TASK_DESCRIPTION',
  payload: { taskId, newDescription },
});

export const incrementCompleted = taskId => ({
  type: 'INCREMENT_COMPLETED_COUNT',
  payload: { taskId },
});

export const decrementCompleted = taskId => ({
  type: 'DECREMENT_COMPLETED_COUNT',
  payload: { taskId },
});

export const addDate = (taskId, date) => ({
  type: 'ADD_TASK_DATE',
  payload: { taskId, date },
});

export const delDate = taskId => ({
  type: 'DEL_TASK_DATE',
  payload: { taskId },
});

export const addTodoItem = (taskId, todoItemId, title = null) => ({
  type: 'ADD_TODO_ITEM',
  payload: { taskId, todoItemId, title },
});

export const delTodoItem = (taskId, todoItemId) => ({
  type: 'DEL_TODO_ITEM',
  payload: { taskId, todoItemId },
});

export const delAllTodoItem = taskId => ({
  type: 'DEL_ALL_TODO_ITEM',
  payload: { taskId },
});

export const moveTodosInTask = (taskId, index1, index2) => ({
  type: 'MOVE_TODOS_IN_TASK',
  payload: { taskId, index1, index2 },
});
