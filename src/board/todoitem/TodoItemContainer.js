import { connect } from 'react-redux';
import TodoItem from './TodoItem';
import { changeTitle, toggleIsCompleted } from '../actions/todoItemActions';
import {
  delTodoItem, incrementCompleted, decrementCompleted,
} from '../actions/taskActions';
import { addTask } from '../actions/columnActions';

const mapStateToProps = (state, props) => {
  const target = state.todoItems[props.todoItemId];
  return {
    title: target && target.title,
    isCompleted: target && target.isCompleted,
  };
};

const mapDispatchToProps = {
  changeTitle,
  toggleIsCompleted,
  delTodoItem,
  incrementCompleted,
  decrementCompleted,
  addTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
