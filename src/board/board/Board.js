import React, { useCallback, useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button, InputBase, Stack } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import FlipMove from "react-flip-move";
import { useMediaQuery } from "react-responsive";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import TimeoutContext from "../../shared/context/timeoutContext";
import AuthContext from "../../shared/context/authContext";
import ColumnContainer from "../column/ColumnContainer";
import TaskModal from "../taskModal/TaskModalContainer";
import EditableTitle from "../subcomponents/editableTitle";
import WarningDialog from "../../shared/components/WarningDialog";
import LoadingOverlay from "../../shared/components/LoadingOverlay";

const Columns = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;
`;

const BoardStyled = styled.div`
  margin-bottom: 35px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ButtonStyled = styled(Button)`
  font-size: 20px;
  color: red;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 65px 0;
`;

const ColumnWrapper = styled.div`
  width: ${({ islargescreen }) => (islargescreen ? "350px" : "100%")};
`;

const SearchBar = styled(InputBase)`
  border-radius: 5px;
  background-color: #ebecf0;

  padding: 5px;
  width: 300px;
`;

const titleInputStyle = {
  outline: "none",
  border: "1px solid lightgray",
  borderRadius: "10px",
  background: "white",
  marginTop: "13px",
  marginBottom: "15px",
  width: "100%",
  fontSize: "30px",
  fontFamily: "inherit",
  fontWeight: "bold",
};

const Board = ({
  title,
  columnOrder,
  changeTitle,
  addColumn,
  delColumn,
  selectedColumn,
  setSelectedColumn,
  swapColumns,
  moveTasksInColumn,
  moveTaskBetweenColumn,
  delTask,
  boardId,
  saveData,
  resetBoardData,
  getData,
  getUserBoardsData,
  isLoading,
  setFilterStr,
}) => {
  const { resetTimeout } = useContext(TimeoutContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [willBeDeleted, setWillBeDeleted] = useState(null);
  const [searchVal, setSearchVal] = useState("");
  const history = useHistory();

  useEffect(() => {
    resetTimeout();
    getData(boardId);
  }, []);

  const saveDataHandler = async () => {
    resetTimeout();
    saveData(boardId);
  };

  const goBackHandler = async () => {
    await saveData(boardId);
    resetBoardData();
    history.push(`/`);
  };

  const islargescreen = useMediaQuery({ minWidth: 700 });

  const flagColumnHandler = useCallback(
    (columnId, ignore) => {
      if (!selectedColumn && !ignore) {
        setSelectedColumn(columnId);
      } else if (selectedColumn === columnId) {
        setSelectedColumn(null);
      } else if (!ignore) {
        swapColumns(selectedColumn, columnId);
        setSelectedColumn(null);
      }
    },
    [selectedColumn]
  );

  const onDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (source.droppableId === destination.droppableId) {
      moveTasksInColumn(source.droppableId, source.index, destination.index);
      return;
    }

    moveTaskBetweenColumn(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId
    );
  };

  if (!title) {
    return <LoadingOverlay />;
  }

  return (
    <BoardStyled>
      {isLoading && <LoadingOverlay />}
      <TaskModal boardId={boardId} />
      <WarningDialog
        open={openDialog}
        onContinue={() => {
          delColumn(willBeDeleted);
          setOpenDialog(false);
        }}
        onClose={() => setOpenDialog(false)}
        msg="Are you sure you want to delete this column?"
      />
      <Stack
        direction="row"
        sx={{
          position: "absolute",
          left: 30,
          top: 30,
        }}
      >
        <Button sx={{ fontSize: 17, color: "secondary.dark" }} onClick={goBackHandler}>
          BACK
        </Button>
        <Button sx={{ fontSize: 17 }} onClick={saveDataHandler}>
          SAVE
        </Button>
      </Stack>
      <TitleWrapper>
        <EditableTitle
          title={title}
          customizedTitle={title.toLowerCase() + "."}
          changeTitle={changeTitle}
          style={titleInputStyle}
          rows={1}
          allowEnter
          variant="h1"
        />
      </TitleWrapper>
      <Stack
        direction="row"
        sx={{
          position: "absolute",
          right: "35px",
          top: "80px",
        }}
      >
        <SearchBar
          placeholder="Search for tasks.."
          className="search-input"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => {
            setSearchVal(e.target.value);
            setFilterStr(e.target.value);
          }}
          value={searchVal}
        />
        <Button
          onClick={() => {
            setFilterStr("");
            setSearchVal("");
          }}
        >
          Reset
        </Button>
      </Stack>
      <Columns>
        <DragDropContext onDragEnd={onDragEnd}>
          <FlipMove typeName={null}>
            {columnOrder.map((columnId) => (
              <ColumnWrapper key={`${columnId}`} islargescreen={islargescreen ? 1 : 0}>
                <ColumnContainer
                  boardId={boardId}
                  key={columnId}
                  islargescreen={islargescreen}
                  columnId={columnId}
                  delColumn={delColumn}
                  flagColumnHandler={flagColumnHandler}
                  setOpenDialog={setOpenDialog}
                  setWillBeDeleted={setWillBeDeleted}
                />
              </ColumnWrapper>
            ))}
          </FlipMove>
        </DragDropContext>
      </Columns>
      {columnOrder.length === 0 && (
        <Button onClick={() => addColumn(0, uuidv4())}>+ Add column</Button>
      )}
    </BoardStyled>
  );
};

export default Board;
