import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { styled as styledMUI } from "@mui/system";
import NaturalDragAnimation from "natural-drag-animation-rbdnd";
import { IconButton, Card, LinearProgress } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import DescriptionIcon from "@mui/icons-material/Description";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faClock,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import EditableTitle from "../subcomponents/editableTitle";
import { Stack, Typography } from "@mui/material";

const TaskCard = styledMUI(Card)(
  ({ isDragDisabled, isfiltermatched, theme }) => ({
    border: isfiltermatched ? "3px solid black" : "none",
    borderRadius: "5px",
    padding: "10px",
    margin: "4px 8px",
    position: "relative",
    background: isDragDisabled ? "lightgrey" : "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    minHeight: "50px",
  })
);

const ProgressBar = styledMUI(LinearProgress)(({ theme }) => ({
  width: "100%",
  height: "5px",
  position: "absolute",
  top: 0,
  left: 0,
}));

const titleStyle = {
  marginTop: "3px",
  marginBottom: "3px",
  width: "100%",
  outline: "none",
  border: "none",
  background: "transparent",
  fontSize: "15px",
  minHeight: "50px",
};

const titleEditStyle = {
  marginTop: "3px",
  marginBottom: "3px",
  width: "100%",
  minHeight: "50px",
  outline: "none",
  border: "none",
  background: "transparent",
  fontSize: "15px",
};

const Task = ({
  changeTitle,
  title,
  description,
  taskId,
  index,
  todo,
  date,
  completedPercentage,
  setSelectedTask,
  filterStr,
}) => {
  const [hovered, setHovered] = useState(false);
  const [filterMatch, setFilterMatch] = useState(false);

  useEffect(() => {
    if (!filterStr) {
      setFilterMatch(false);
      return;
    }
    setFilterMatch(title.toLowerCase().includes(filterStr.toLowerCase()));
  }, [filterStr]);

  const getDaysLeft = useCallback(() => {
    const today = new Date();
    const differenceMS = new Date(date) - today;
    const daysRemaining = Math.floor(differenceMS / 86400000) + 1;
    if (daysRemaining === 0) return "today";
    return `${daysRemaining}d`;
  }, [date]);

  return (
    <Draggable key={taskId} draggableId={taskId} index={index}>
      {(provided, snapshot) => (
        <NaturalDragAnimation
          style={provided.draggableProps.style}
          snapshot={snapshot}
        >
          {(style) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              isdragging={snapshot.isdragging}
              ref={provided.innerRef}
              style={style}
            >
              <TaskCard
                elevation={snapshot.isdragging ? 16 : 0}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                isfiltermatched={filterMatch ? 1 : 0}
              >
                {todo.length !== 0 && (
                  <ProgressBar
                    variant="determinate"
                    color="primary"
                    value={completedPercentage}
                  />
                )}
                <EditableTitle
                  title={title}
                  changeTitle={(val) => changeTitle(taskId, val)}
                  style={titleEditStyle}
                  normalStyle={titleStyle}
                  allowEnter
                  variant="body1"
                />
                {description && (
                  <DescriptionIcon
                    sx={{
                      fontSize: "20px",
                      mr: "3px",
                    }}
                  />
                )}
                {date && (
                  <Stack
                    sx={{ alignItems: "center", mr: "3px", mb: "14px", gap: 0 }}
                  >
                    <Typography
                      variant="h1"
                      sx={{
                        fontSize: "11px",
                        mb: "-2px",
                      }}
                    >
                      {getDaysLeft()}
                    </Typography>
                    <AccessTimeFilledIcon
                      size="large"
                      sx={{
                        fontSize: "20px",
                      }}
                    />
                  </Stack>
                )}
                {hovered && (
                  <IconButton
                    sx={{
                      height: "35px",
                      width: "35px",
                    }}
                    onClick={() => setSelectedTask(taskId)}
                  >
                    <MoreHorizIcon
                      sx={{
                        fontSize: "25px",
                      }}
                    />
                  </IconButton>
                )}
              </TaskCard>
            </div>
          )}
        </NaturalDragAnimation>
      )}
    </Draggable>
  );
};

export default React.memo(Task);
