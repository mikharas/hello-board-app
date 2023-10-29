import { connect } from 'react-redux';
import {
  changeTitle, addColumn, delColumn, swapColumns, setSelectedColumn, saveData, getData, resetBoardData,
} from '../actions/boardActions';
import {
  addTask, delTask, moveTasksInColumn, moveTaskBetweenColumn,
} from '../actions/columnActions';
import { getUserBoardsData } from '../actions/userBoardsActions';
import { setFilterStr } from '../../globalActions';

import Board from './Board';

const mapStateToProps = state => ({
  title: state.board.title,
  columnOrder: state.board.columnOrder,
  selectedColumn: state.board.selectedColumn,
  isLoading: state.gb.isLoading,
});

const mapDispatchToProps = {
  delColumn,
  addColumn,
  changeTitle,
  swapColumns,
  setSelectedColumn,
  moveTasksInColumn,
  moveTaskBetweenColumn,
  addTask,
  delTask,
  saveData,
  getData,
  resetBoardData,
  getUserBoardsData,
  setFilterStr,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
