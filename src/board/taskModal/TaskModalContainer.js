import { connect } from 'react-redux';
import TaskModal from './TaskModal';
import { delTask } from '../actions/columnActions';
import {
  changeTitle, changeDescription, moveTodosInTask, addTodoItem, addDate, delDate, delAllTodoItem,
} from '../actions/taskActions';
import {
  getUserBoardsData,
} from '../actions/userBoardsActions';
import { saveData } from '../actions/boardActions';
import { setSelectedTask } from '../../globalActions';

const mapStateToProps = (state) => {
  const task = state.gb.selectedTask && state.tasks[state.gb.selectedTask];
  return {
    title: task && task.title,
    description: task && task.description,
    date: task && task.date,
    completedCount: task && task.completedCount,
    todo: task && task.todo,
    completedPercentage: task && (task.completedCount / task.todo.length) * 100,
    taskId: task && state.gb.selectedTask,
    columnId: task && task.columnId,
    isLoading: state.gb.isLoading,
  };
};

const mapDispatchToProps = {
  changeTitle,
  changeDescription,
  moveTodosInTask,
  addTodoItem,
  delTask,
  addDate,
  delDate,
  getUserBoardsData,
  saveData,
  setSelectedTask,
  delAllTodoItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskModal);
