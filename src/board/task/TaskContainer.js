import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';
import TaskMobile from './TaskMobile';
import TaskDesktop from './TaskDesktop';
import { changeTitle } from '../actions/taskActions';
import { setSelectedTask } from '../../globalActions';

const Task = isMobile ? TaskMobile : TaskDesktop;

const mapStateToProps = (state, props) => {
  const task = state.tasks[props.taskId];
  return {
    title: task.title,
    description: task.description,
    date: task.date,
    completedCount: task.completedCount,
    todo: task.todo,
    completedPercentage: (task.completedCount / task.todo.length) * 100,
    filterStr: state.gb.filterStr,
  };
};

const mapDispatchToProps = {
  changeTitle,
  setSelectedTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
