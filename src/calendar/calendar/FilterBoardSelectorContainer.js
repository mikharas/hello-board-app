import { connect } from 'react-redux';
import * as R from 'ramda';
import FilterBoardSelector from './FilterBoardSelector';

const mapStateToProps = (state, props) => {
  const idToTitle = R.reduceBy(
    (acc, boardId) => {
      return acc.concat(state.userBoards[boardId].title)
    } ,
    [],
    boardId => boardId,
    props.boardIds,
  );
  return {
    idToTitle,
  };
};
export default connect(mapStateToProps, {})(FilterBoardSelector);
