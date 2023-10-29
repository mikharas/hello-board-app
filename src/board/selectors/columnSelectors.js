import { createSelector } from 'reselect';

export const getTitle = (state, props) => state.columns[props.columnId].title;

export const getTaskOrder = (state, props) => state.columns[props.columnId].taskOrder;
