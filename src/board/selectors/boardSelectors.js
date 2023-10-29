import { createSelector } from 'reselect';

export const getTitle = state => state.board.title;

export const getColumnOrder = state => state.board.columnOrder;

export const getSelectedColumn = state => state.board.selectedColumn;

export const getUniqueId = createSelector(getColumnOrder, (order) => {
  let i = 1;
  while (order.includes(`column-${i}`)) {
    i += 1;
  }
  return `column-${i}`;
});
