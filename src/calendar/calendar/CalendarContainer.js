import { connect } from "react-redux";
import { changeMonth, getEvents } from "../actions/calendarActions";
import Calendar from "./Calendar";
import { moveEventBetweenDates } from "../actions/dateActions";
import { getUserBoardsData } from "../../board/actions/userBoardsActions";

const mapStateToProps = (state) => ({
  monthName: state.calendar.monthName,
  yearName: state.calendar.yearName,
  dates: state.calendar.dates,
  boardIds: Object.keys(state.userBoards),
  userBoards: state.userBoards,
  userId: state.auth.user && state.auth.user.userId,
});

const mapDispatchToProps = {
  changeMonth,
  getEvents,
  moveEventBetweenDates,
  getUserBoardsData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
