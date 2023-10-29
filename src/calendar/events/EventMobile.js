import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, useHistory } from 'react-router-dom';
import { Popper, ClickAwayListener } from '@material-ui/core';

const PopperWrapper = styled.div`
  background: teal;
  color: white;
  padding: 3px;
  max-width: 200px;
  border-radius: 5px;

  h1 {
    font-size: 15px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  position: relative;
  overflow: hidden;

  .text {
    padding: 0;
    font-size: 15px;
    font-family: inherit;
    color: black;
    text-transform: none;
    text-align: left;
    height: 100%;
    width: 55%;
    position: absolute;
    top: 0;
    left: 43px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
  }

`;

const Dot = styled.div`
  background: ${props => props.colour};
  height: 15px;
  width: 15px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  margin-top: 8px;
  margin-left: 15px;

  .MuiIconButton-root .MuiButton-label{
    font-size: 15px;
    margin: 0;
    padding: 0;
    width: 100%;
  }
`;

const Event = ({
  id, date, title, description, todo, boardId, setSelectedTask,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const history = useHistory();

  const open = Boolean(anchorEl);
  return (
    <>
      <ClickAwayListener
        onClickAway={handlePopoverClose}
      >
        <Wrapper onClick={handlePopoverOpen}>
          <Dot colour="teal" />
          <div
            className="text"
          >
            {title}
          </div>
        </Wrapper>
      </ClickAwayListener>
      <Popper
        className="popper"
        open={open}
        anchorEl={anchorEl}
        onTouchStart={() => {
          setSelectedTask(id);
          history.push(`/boards/${boardId}`);
        }}
      >
        <PopperWrapper>
          <h1>{title}</h1>
        </PopperWrapper>
      </Popper>
    </>
  );
};

export default Event;
