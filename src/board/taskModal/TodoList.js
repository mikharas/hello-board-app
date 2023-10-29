import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { List, Paper, LinearProgress, Typography } from "@mui/material";
import TodoItem from "../todoitem/TodoItemContainer";
import NewTodoItem from "../todoitem/NewTodoItem";

const Wrapper = styled.div`
  text-align: center;

  .progress-text {
    font-size: 14px;
  }
`;

const ListWrapper = styled(Paper)`
  width: 100%;
  max-height: 320px;
  overflow: auto;
`;

const TodoList = ({
  todo,
  taskId,
  addTodoItem,
  completedPercentage,
  columnId,
}) => {
  const progressBar = (
    <>
      <Typography
        variant="body1"
        sx={{
          fontSize: "14px",
          mb: "8px",
        }}
      >
        {Math.floor(completedPercentage) || 0}% completed
      </Typography>
      <LinearProgress
        variant="determinate"
        color="primary"
        value={completedPercentage || 0}
      />
    </>
  );

  if (todo.length == 0) return <></>;

  return (
    <Wrapper>
      {todo.length !== 0 && progressBar}
      <Droppable droppableId={taskId}>
        {(provided) => (
          <ListWrapper
            ref={provided.innerRef}
            {...provided.droppableProps}
            elevation={0}
          >
            <List>
              {todo.map((todoItemId, index) => (
                <TodoItem
                  key={todoItemId}
                  index={index}
                  taskId={taskId}
                  columnId={columnId}
                  todoItemId={todoItemId}
                />
              ))}
            </List>
            {provided.placeholder}
          </ListWrapper>
        )}
      </Droppable>
      <NewTodoItem taskId={taskId} addTodoItem={addTodoItem} />
    </Wrapper>
  );
};

export default React.memo(TodoList);
