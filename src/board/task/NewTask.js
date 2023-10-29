import React, { useState, useCallback } from "react";
import TextareaAutosize from "react-autosize-textarea";
import { Card, Button, ClickAwayListener } from "@mui/material";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const TextArea = styled(TextareaAutosize)`
  min-height: 45px;
  width: 100%;
  outline: none;
  border: none;
  background: transparent;
  font-size: inherit;
  font-family: inherit;
  padding: 10px;
`;

const TaskCard = styled(Card)`
  margin: 3px 6px;
  minheight: 50px;
  .input {
    width: 100%;
    height: 35px;
    outline: none;
    border: none;
  }
`;

const style = {
  width: "90%",
  outline: "none",
  border: "none",
  background: "transparent",
  fontSize: "15px",
  resize: "none",
};

const NewTask = ({ columnId, addTask }) => {
  const [value, setValue] = useState("");
  const [isButton, setIsButton] = useState(true);

  const toggleIsButton = useCallback(() => {
    setIsButton(!isButton);
  }, [isButton]);

  if (isButton) {
    return (
      <Button
        className="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleIsButton();
        }}
      >
        + Add Task
      </Button>
    );
  }

  return (
    <ClickAwayListener
      onClickAway={() => {
        if (value) {
          addTask(columnId, uuidv4(), value);
          setValue("");
        }
        toggleIsButton();
      }}
    >
      <TaskCard>
        <TextArea
          autoFocus
          placeholder="Enter text here..."
          style={style}
          className="input"
          type="text"
          value={value}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              if (value) {
                addTask(columnId, uuidv4(), value);
                setValue("");
              }
              toggleIsButton();
            }
          }}
        />
      </TaskCard>
    </ClickAwayListener>
  );
};

export default React.memo(NewTask);
