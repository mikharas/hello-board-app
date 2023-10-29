import React, { useCallback, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";
import { styled as styledMUI } from "@mui/system";
import {
  Checkbox,
  ClickAwayListener,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import EditableTitle from "../subcomponents/editableTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

const ItemStyled = styledMUI(ListItem)(
  ({ theme, ishovered, isdragging, isChecked }) => ({
    background: ishovered || isdragging ? "#EBECF0" : "#fff",
    borderRadius: "10px",
    textDecoration: isChecked && "line-through",
    color: isChecked && theme.palette.primary.main,
    // height: 50px;
  })
);

const normalTitleStyle = {
  width: "100%",
  outline: "none",
  border: "none",
  fontWeight: "normal",
  fontSize: "15px",
};

const editTitleStyle = {
  width: "100%",
  outline: "none",
  border: "none",
  fontWeight: "normal",
  fontSize: "15px",
};

const TodoItem = ({
  key,
  index,
  columnId,
  todoItemId,
  title,
  isCompleted,
  changeTitle,
  toggleIsCompleted,
  taskId,
  incrementCompleted,
  decrementCompleted,
  delTodoItem,
  addTask,
}) => {
  const [ishovered, setishovered] = useState(false);

  const changeTodoItemTitle = useCallback(
    (newTitle) => {
      changeTitle(todoItemId, newTitle);
    },
    [todoItemId]
  );
  const theme = useTheme();
  const normalTitleStyleGrayed = {
    width: "100%",
    color: theme.palette.primary.main,
    textDecoration: "line-through",
    outline: "none",
    border: "none",
    fontWeight: "normal",
    fontSize: "15px",
  };

  return (
    <Draggable key={todoItemId} draggableId={todoItemId} index={index}>
      {(provided, snapshot) => (
        <ItemStyled
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          ishovered={ishovered ? 1 : 0}
          isdragging={snapshot.isdragging}
          onMouseEnter={() => setishovered(true)}
          onMouseLeave={() => setishovered(false)}
        >
          <Checkbox
            checked={isCompleted}
            edge="start"
            tabIndex={-1}
            onClick={(e) => {
              e.stopPropagation();
              toggleIsCompleted(todoItemId);
              if (isCompleted) decrementCompleted(taskId);
              else incrementCompleted(taskId);
            }}
          />
          <EditableTitle
            title={title}
            changeTitle={changeTodoItemTitle}
            style={editTitleStyle}
            normalStyle={
              isCompleted ? normalTitleStyleGrayed : normalTitleStyle
            }
            rows={1}
            allowEnter
            variant="body1"
          />
          <IconButton
            onClick={() => {
              delTodoItem(taskId, todoItemId);
              if (isCompleted) {
                decrementCompleted(taskId);
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              addTask(columnId, uuidv4(), title);
              delTodoItem(taskId, todoItemId);
            }}
          >
            <TrendingFlatIcon />
          </IconButton>
        </ItemStyled>
      )}
    </Draggable>
  );
};

export default React.memo(TodoItem);
