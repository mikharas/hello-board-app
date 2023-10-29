import { connect } from 'react-redux';
import DateSquare from './DateSquare';

const mapStateToProps = (state, props) => {
  return {
    date: state.dates[props.id].date,
    eventIds: state.dates[props.id].eventIds.filter(
      (eventId) => {
        if (state.events[eventId]) {
          return props.showBoard.includes(state.events[eventId].boardId);
        }
        return false;
      },
    ),
  };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(DateSquare);
