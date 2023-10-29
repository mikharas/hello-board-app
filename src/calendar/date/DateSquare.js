import React from "react";
import styled from "styled-components";
import Event from "../events/EventContainer";
import { Box } from "@mui/material";

const Wrapper = styled.div`
  width: 13%;
  height: 100%;
  background: white;
  border-radius: 10px;

  .circle {
    background: ${({ isToday }) => (isToday ? "teal" : "initial")};
    border-radius: 25px;
    width: 35px;
    height 35px;
    margin-left: 5px;
  }

  p {
    font-size: 20px;
    height: 100%;
    width: 100%;
    text-align: center;
    padding-top: 5px;
    color: ${({ isToday }) => (isToday ? "white" : "initial")};
  }

  .events {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

  }
`;

const getIsToday = (date) => {
  if (!date) return false;
  let todayDate = new Date();
  todayDate = new Date(
    todayDate.getFullYear(),
    todayDate.getMonth(),
    todayDate.getDate()
  );
  if (todayDate.toISOString() === date.toISOString()) return true;
  return false;
};

const DateSquare = ({ id, date, eventIds }) => {
  return (
    <Wrapper isToday={getIsToday(date)}>
      <Box
        sx={{
          bgcolor: getIsToday(date) ? "primary.main" : "initial",
          borderRadius: "25px",
          width: "35px",
          height: "35px",
          ml: "5px",
        }}
      >
        <p>{date && date.getDate()}</p>
      </Box>
      <div className="events">
        {eventIds.map((eventId) => (
          <Event id={eventId} key={eventId}/>
        ))}
      </div>
    </Wrapper>
  );
};

export default React.memo(DateSquare);
