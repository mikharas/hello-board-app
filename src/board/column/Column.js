import React, { forwardRef, useCallback, useState } from "react";
import styled from "@emotion/styled";
import { Stack, Paper, ClickAwayListener, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { styled as styledMUI } from "@mui/system";
import TaskContainer from "../task/TaskContainer";
import NewTask from "../task/NewTask";
import EditableTitle from "../subcomponents/editableTitle";

const titleStyleNormal = {
  outline: "none",
  marginTop: "13px",
  marginBottom: "15px",
  fontSize: "17px",
  padding: "15px",
  textAlign: "left",
};

const titleStyle = {
  textAlign: "left",
  outline: "none",
  background: "white",
  marginTop: "13px",
  marginBottom: "15px",
  fontWeight: "bold",
  fontSize: "17px",
  padding: "15px",
  width: "90%",
  borderRadius: "10px",
  border: "0",
};

const ColumnStyled = styledMUI(Paper)(({ theme }) => {
  return {
    position: "relative",
    background: theme.palette.secondary.light,
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    px: 0,
    paddingBottom: "15px",
    margin: "10px",
    flexGrow: 1,
  };
});

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderStyled = styled.div`
  margin-top: 7px;
  margin-left: 7px;
  margin-right: 7px;
  width: 70%;
`;

const Header = React.memo(({ title, changeColumnTitle }) => (
  <HeaderStyled>
    <EditableTitle
      rows={1}
      title={title}
      changeTitle={changeColumnTitle}
      style={titleStyle}
      normalStyle={titleStyleNormal}
      allowEnter
      variant="h1"
    />
  </HeaderStyled>
));

const Column = forwardRef(
  (
    {
      skipRender,
      title,
      changeTitle,
      columnId,
      addTask,
      addColumn,
      delColumn,
      flagColumnHandler,
      taskOrder,
      islargescreen,
      boardSelectedColumn,
      boardId,
      setOpenDialog,
      setWillBeDeleted,
    },
    ref
  ) => {
    const changeColumnTitle = useCallback(
      (newTitle) => {
        changeTitle(columnId, newTitle);
      },
      [columnId]
    );

    const [showButtons, setShowButtons] = useState(false);

    if (skipRender) {
      return null;
    }

    return (
      <ClickAwayListener
        onClickAway={() => {
          flagColumnHandler(columnId, true);
        }}
      >
        <ColumnStyled
          islargescreen={islargescreen ? 1 : 0}
          elevation={boardSelectedColumn === columnId ? 24 : 0}
          onClick={() => flagColumnHandler(columnId, false)}
          onMouseOver={() => setShowButtons(true)}
          onMouseLeave={() => setShowButtons(false)}
        >
          <Stack direction="row" sx={{ width: "100%", alignItems: "center" }}>
            <Header title={title} changeColumnTitle={changeColumnTitle} />
            {showButtons && (
              <Stack direction="row" sx={{ float: "right", height: "40px" }}>
                <IconButton
                  size="small"
                  className="del"
                  onClick={(e) => {
                    e.stopPropagation();
                    setWillBeDeleted(columnId);
                    setOpenDialog(true);
                  }}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
                <IconButton
                  size="small"
                  className="ins"
                  onClick={(e) => {
                    e.stopPropagation();
                    addColumn(columnId, uuidv4());
                  }}
                >
                  <AddCircleIcon />
                </IconButton>
              </Stack>
            )}
          </Stack>
          <Droppable droppableId={columnId}>
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isdraggingOver={snapshot.isdraggingOver}
              >
                {taskOrder.map((taskId, index) => (
                  <TaskContainer
                  	key={taskId}
                    columnId={columnId}
                    taskId={taskId}
                    index={index}
                    boardId={boardId}
                  />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
          <NewTask columnId={columnId} addTask={addTask} />
        </ColumnStyled>
      </ClickAwayListener>
    );
  }
);

export default React.memo(Column);
