import * as R from "ramda";
import data from "../reducers/monthsData";
import authHeader from "../../services/authHeader";
import axios from "axios";
import isExpired from "../../services/checkAuthExpiry";

const api = `${process.env.REACT_APP_BACKEND_URL}/api`;

const getNewDate = (newDate, prevDateIndex, prevWeekIndex) => {
  const firstDayIndex = newDate.getDay();
  const newDateNumber = prevWeekIndex * 7 + (prevDateIndex - firstDayIndex + 1);
  if (
    newDateNumber <= 0 ||
    newDateNumber > data[newDate.getMonth()].daysCount
  ) {
    return null;
  }
  return new Date(newDate.getFullYear(), newDate.getMonth(), newDateNumber);
};

export const getEvents = (userId) => async (dispatch, getState) => {
  if (isExpired()) {
    dispatch({
      type: "LOGOUT"
    })
    alert("Your session has ended and was logged out.")
    return;
  }
  dispatch({
    type: "SET_LOADING",
    payload: true,
  });
  await axios
    .get(`${api}/boards/user/${userId}`, { headers: authHeader() })
    .then((response) => {
      const idToBoard = R.groupBy(
        (boardData) => boardData.id,
        response.data.boards
      );
      Object.keys(idToBoard).forEach((id) => {
        idToBoard[id] = idToBoard[id][0];
      });

      const events = {};
      R.forEachObjIndexed(({ tasks }, boardId) => {
        Object.values(tasks).forEach((task) => {
          if (task.date != null) {
            events[task.id] = { ...task, boardId };
          }
        });
      }, idToBoard);

      dispatch({
        type: "SET_EVENTS_DATA",
        payload: { events },
      });
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    });
};

export const changeMonth = (newDate) => (dispatch, getState) => {
  const dateIds = Object.keys(getState().dates);
  // get the new dates for each date id
  const dateIdToNewDate = R.reduceBy(
    (acc, dateId) => {
      const { dateIndex } = getState().dates[dateId];
      const { weekIndex } = getState().dates[dateId];
      return acc.concat(getNewDate(newDate, dateIndex, weekIndex));
    },
    [],
    (dateId) => dateId,
    dateIds
  );

  // Now we should make a date to event ids dictionary

  // iso date string to collection of eventIds
  const events = Object.values(getState().events);
  const dateToEventIds = R.reduceBy(
    (acc, { id }) => acc.concat(id), // value fn
    [],
    ({ date }) => date, // key fn
    events
  );

  const dateIdToEventIds = R.reduceBy(
    (acc, dateId) => {
      if (dateIdToNewDate[dateId][0]) {
        const dateISOString = dateIdToNewDate[dateId][0].toISOString();
        if (dateToEventIds[dateISOString]) {
          return acc.concat(dateToEventIds[dateISOString]);
        }
        return acc;
      }
      return acc;
    },
    [],
    (dateId) => dateId,
    dateIds
  );

  dispatch({
    type: "CHANGE_MONTH",
    payload: {
      newDate,
      dateIdToEventIds,
      dateIdToNewDate,
    },
  });
};
