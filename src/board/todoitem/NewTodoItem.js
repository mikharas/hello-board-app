import React, { useState, useCallback } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { Card, Button, ClickAwayListener } from '@material-ui/core';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import "../../fonts/typography.css";

const TextArea = styled(TextareaAutosize)`
  min-height: 45px;
  width: 100%;
  outline: none;
  border: none;
  background: transparent;
  font-size: inherit;
  font-family: Avenir Roman;
`;

const TaskCard = styled.div`
  .input {
    width: 100%;
    height: 35px;
    outline: none;
    border: 1px solid;
    padding: 10px;
  }
`;

const NewTodoItem = ({ taskId, addTodoItem }) => {
  const [value, setValue] = useState('');
  const [isButton, setIsButton] = useState(true);

  const toggleIsButton = useCallback(() => {
    setIsButton(!isButton);
  }, [isButton]);

  if (isButton) {
    return (
      <Button
        className="button"
        onClick={toggleIsButton}
      >
        + Add Todo Item
      </Button>
    );
  }

  return (
    <ClickAwayListener onClickAway={() => {
      if (value) {
        addTodoItem(taskId, uuidv4(), value);
        setValue('');
      }
      toggleIsButton();
    }}
    >
      <TaskCard>
        <TextArea
          autoFocus
          placeholder="Enter text here..."
          className="input"
          type="text"
          elevation={3}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              if (value) {
                addTodoItem(taskId, uuidv4(), value);
                setValue('');
              }
              toggleIsButton();
            }
          }}
        />
      </TaskCard>
    </ClickAwayListener>
  );
};

export default React.memo(NewTodoItem);
