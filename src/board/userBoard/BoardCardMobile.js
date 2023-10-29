import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Card, Button, ClickAwayListener } from '@material-ui/core';

const BoardCardFront = styled(Card)`
  width: 300px;
  height: 100px;
  margin-bottom: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;

  .link {
    font-family: inherit;
    font-size: 20px;
    text-decoration: none;
    color: gray;
  }
`;

const BoardCardBack = styled(Card)`
  width: 300px;
  height: 100px;
  margin-bottom: 20px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;

  .link {
    text-decoration: none;
    color: gray;
  }

  .button {
    font-family: inherit;
    font-size: 20px;
    text-decoration: none;
    color: gray;
  }
`;

const BoardCard = ({
  title, id, setOpenDialog, setWillBeDeleted,
}) => {
  const [selected, setSelected] = useState(false);
  if (!selected) {
    return (
      <BoardCardFront
        onClick={() => setSelected(true)}
      >
        <h2>{title}</h2>
      </BoardCardFront>
    );
  } return (
    <ClickAwayListener
      onClickAway={() => setSelected(false)}
    >
      <BoardCardBack>
        <Button className="button"><NavLink className="link" to={`/boards/${id}`}>OPEN</NavLink></Button>
        <Button
          className="button"
          onClick={() => {
            setWillBeDeleted(id);
            setOpenDialog(true);
          }}
        >
          Delete
        </Button>
      </BoardCardBack>
    </ClickAwayListener>
  );
};

export default React.memo(BoardCard);
