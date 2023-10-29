export const moveEventBetweenDates = (dateId1, dateId2, index1, index2, eventId) => ({
  type: 'MOVE_EVENT_BETWEEN_DATE',
  payload: {
    dateId1, dateId2, index1, index2, eventId,
  },
});
