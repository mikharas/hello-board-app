import * as R from 'ramda';
const initialTodoItemData = {
  'todo-1': {
    id: 'todo-1',
    title: 'first todo',
    isCompleted: false,
  },
  'todo-2': {
    id: 'todo-2',
    title: 'second todo',
    isCompleted: false,
  },
  'todo-3': {
    id: 'todo-3',
    title: 'third todo',
    isCompleted: false,
  },
};

const todoItemReducer = (state = initialTodoItemData, { type, payload }) => {
  let newState;
  switch (type) {
    case 'SET_BOARD_DATA':
      return {
        ...payload.todoItems,
      };

    case 'CHANGE_TODO_ITEM_TITLE':
      newState = {
        ...state,
        [payload.todoItemId]: {
          ...state[payload.todoItemId],
          title: payload.newTitle,
        },
      };
      return newState;

    case 'TOGGLE_IS_COMPLETED':
      newState = {
        ...state,
        [payload.todoItemId]: {
          ...state[payload.todoItemId],
          isCompleted: !state[payload.todoItemId].isCompleted,
        },
      };

      return newState;


    case 'ADD_TODO_ITEM':
      return {
        ...state,
        [payload.todoItemId]: {
          id: payload.todoItemId,
          taskId: payload.taskId,
          title: payload.title || 'New todo item',
          isCompleted: false,
        },
      };

    case 'DEL_TODO_ITEM':
      newState = { ...state };
      delete newState[payload.todoItemId];
      return newState;

    case 'DEL_ALL_TODO_ITEM':
      newState = {};
      R.forEachObjIndexed((value, id) => {
        if (value.taskId !== payload.taskId) {
          newState[id] = value;
        }
      }, state);
      return newState;

    case 'DEL_TASK':
      newState = {};
      R.forEachObjIndexed((value, id) => {
        if (value.taskId !== payload.taskId) {
          newState[id] = value;
        }
      }, state);
      return newState;

    default:
      return state;
  }
};

export default todoItemReducer;
