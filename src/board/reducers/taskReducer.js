import * as R from 'ramda';

const taskReducer = (state = {}, { type, payload }) => {
  let newState;
  switch (type) {
    case 'SET_BOARD_DATA':
      return {
        ...payload.tasks,
      };

    case 'CHANGE_TASK_TITLE':
      newState = {
        ...state,
        [payload.taskId]: {
          ...state[payload.taskId],
          title: payload.newTitle,
        },
      };
      return newState;

    case 'CHANGE_TASK_DESCRIPTION':
      newState = {
        ...state,
        [payload.taskId]: {
          ...state[payload.taskId],
          description: payload.newDescription,
        },
      };
      return newState;

    case 'INCREMENT_COMPLETED_COUNT':
      return {
        ...state,
        [payload.taskId]: {
          ...state[payload.taskId],
          completedCount: state[payload.taskId].completedCount + 1,
        },
      };

    case 'DECREMENT_COMPLETED_COUNT':
      return {
        ...state,
        [payload.taskId]: {
          ...state[payload.taskId],
          completedCount: state[payload.taskId].completedCount - 1,
        },
      };

    case 'ADD_TASK_DATE':
      return {
        ...state,
        [payload.taskId]: {
          ...state[payload.taskId],
          date: payload.date,
        },
      };

    case 'DEL_TASK_DATE':
      return {
        ...state,
        [payload.taskId]: {
          ...state[payload.taskId],
          date: null,
        },
      };

    case 'DEL_ALL_TODO_ITEM':
      return {
        ...state,
        [payload.taskId]: {
          ...state[payload.taskId],
          todo: [],
          completedCount: 0,
        },
      };

    case 'ADD_TASK':
      return {
        ...state,
        [payload.taskId]: {
          columnId: payload.columnId,
          id: payload.taskId,
          title: payload.content || 'New Task',
          date: null,
          description: '',
          todo: [],
          completedCount: 0,
        },
      };

    case 'DEL_TASK':
      newState = { ...state };
      delete newState[payload.taskId];
      return newState;

    case 'MOVE_TODOS_IN_TASK':
      const newTodo = [...state[payload.taskId].todo];
      const save = newTodo[payload.index1];
      newTodo.splice(payload.index1, 1);
      newTodo.splice(payload.index2, 0, save);

      return {
        ...state,
        [payload.taskId]: {
          ...state[payload.taskId],
          todo: newTodo,
        },
      };

    case 'MOVE_TASK_BETWEEN_COLUMN':
      return {
        ...state,
        [payload.taskId]: {
          ...state[payload.taskId],
          columnId: payload.columnId2,
        },
      };

    case 'ADD_TODO_ITEM':
      return {
        ...state,
        [payload.taskId]: {
          ...state[payload.taskId],
          todo: [
            ...state[payload.taskId].todo,
            payload.todoItemId,
          ],
        },
      };

    case 'DEL_TODO_ITEM':
      return {
        ...state,
        [payload.taskId]: {
          ...state[payload.taskId],
          todo: state[payload.taskId].todo.filter(todoItemId => (
            payload.todoItemId !== todoItemId
          )),
        },
      };

    case 'DEL_COLUMN':
      newState = {};
      R.forEachObjIndexed((value, id) => {
        if (value.columnId !== payload) {
          newState[id] = value;
        }
      }, state);
      return newState;

    default:
      return state;
  }
};

export default taskReducer;
