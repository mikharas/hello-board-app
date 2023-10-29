export const changeTitle = (todoItemId, newTitle) => ({
  type: 'CHANGE_TODO_ITEM_TITLE',
  payload: { todoItemId, newTitle },
});

export const toggleIsCompleted = todoItemId => ({
  type: 'TOGGLE_IS_COMPLETED',
  payload: { todoItemId },
});
