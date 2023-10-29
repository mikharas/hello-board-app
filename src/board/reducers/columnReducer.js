const initialColumnsData = {
  'column-1': {
    id: 'column-1',
    title: 'first column',
    taskOrder: ['task-1', 'task-2'],
  },
  'column-2': {
    id: 'column-2',
    title: 'second column',
    taskOrder: ['task-3'],
  },
  'column-3': {
    id: 'column-3',
    title: 'third column',
    taskOrder: [],
  },
};

const columnReducer = (state = initialColumnsData, { type, payload }) => {
  switch (type) {
    case 'SET_BOARD_DATA':
      return {
        ...payload.columns,
      };

    case 'ADD_COLUMN':
      return {
        ...state,
        [payload.insertAfter]: {
          id: payload.insertAfter,
          title: 'New Column',
          taskOrder: [],
        },
      };

    case 'DEL_COLUMN':
      const newState = { ...state };
      delete newState[payload];
      return newState;

    case 'MOVE_TASKS_IN_COLUMN':
      const newTaskOrder = [...state[payload.columnId].taskOrder];

      const save = newTaskOrder[payload.index1];
      newTaskOrder.splice(payload.index1, 1);
      newTaskOrder.splice(payload.index2, 0, save);

      return {
        ...state,
        [payload.columnId]: {
          ...state[payload.columnId],
          taskOrder: newTaskOrder,
        },
      };

    case 'MOVE_TASK_BETWEEN_COLUMN':
      const newTaskOrder1 = [...state[payload.columnId1].taskOrder];
      const newTaskOrder2 = [...state[payload.columnId2].taskOrder];

      newTaskOrder1.splice(payload.index1, 1);
      newTaskOrder2.splice(payload.index2, 0, payload.taskId);

      return {
        ...state,
        [payload.columnId1]: {
          ...state[payload.columnId1],
          taskOrder: newTaskOrder1,
        },
        [payload.columnId2]: {
          ...state[payload.columnId2],
          taskOrder: newTaskOrder2,
        },
      };


    case 'ADD_TASK':
      return {
        ...state,
        [payload.columnId]: {
          ...state[payload.columnId],
          taskOrder: [
            ...state[payload.columnId].taskOrder,
            payload.taskId,
          ],
        },
      };

    case 'DEL_TASK':
      return {
        ...state,
        [payload.columnId]: {
          ...state[payload.columnId],
          taskOrder: state[payload.columnId].taskOrder.filter(taskId => (
            payload.taskId !== taskId
          )),
        },
      };

    case 'CHANGE_COLUMN_TITLE':
      return {
        ...state,
        [payload.columnId]: {
          ...state[payload.columnId],
          title: payload.title,
        },
      };

    default:
      return state;
  }
};

export default columnReducer;
