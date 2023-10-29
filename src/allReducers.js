import { combineReducers } from 'redux';
import authReducer from './auth/reducers/authReducer';
import boardReducer from './board/reducers/boardReducer';
import columnReducer from './board/reducers/columnReducer';
import taskReducer from './board/reducers/taskReducer';
import todoItemReducer from './board/reducers/todoItemReducer';
import userBoardsReducer from './board/reducers/userBoardsReducer';
import calendarReducer from './calendar/reducers/calendarReducer';
import dateReducer from './calendar/reducers/dateReducer';
import eventReducer from './events/reducers/eventReducer';
import globalReducer from './globalReducer';


export default combineReducers({
  auth: authReducer,
  board: boardReducer,
  columns: columnReducer,
  tasks: taskReducer,
  todoItems: todoItemReducer,
  userBoards: userBoardsReducer,
  calendar: calendarReducer,
  dates: dateReducer,
  events: eventReducer,
  gb: globalReducer,
});
