import React, { useEffect, useState, useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { styled as styledMUI } from "@mui/system";
import TimeoutContext from "../../shared/context/timeoutContext";
import DateSquare from "../date/DateSquareContainer";
import FilterBoardSelector from "./FilterBoardSelectorContainer";
import Header from "./Header";

const BackButton = styledMUI(Button)(({ theme }) => ({
  position: "absolute",
  left: "30px",
  top: "30px",
  fontSize: "17px",
  color: theme.palette.primary.main,
}));

const Wrapper = styled.div`
  position: relative;

  .topRight {
    display: flex;
    align-items: center;
    position: absolute;
    right: 60px;
    top: 30px;
  }
`;

const weekdays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

const Body = styled.div`
  background: #ebecf0;
  padding: 15px;
`;

const WeekContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: 80%;
  height: 180px;
  justify-content: space-evenly;
  padding: 10px 0;
`;

const DayLabel = styled.div`
  display: flex;
  margin: 0 auto;
  padding-bottom: 20px;
  width: 80%;
  height: 30px;
  justify-content: space-evenly;

  p {
    width: 13%;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
  }
`;

const Calendar = ({
  monthName,
  yearName,
  dates,
  changeMonth,
  moveEventBetweenDates,
  addEvent,
  delEvent,
  boardIds,
  getEvents,
  getUserBoardsData,
  yearMonth,
  userBoards,
  userId,
}) => {
  const [showBoard, setShowBoard] = useState(boardIds);

  const { resetTimeout } = useContext(TimeoutContext);

  const goToday = () => {
    const todayDate = new Date();
    changeMonth(new Date(todayDate.getFullYear(), todayDate.getMonth(), 1));
  };
  const goToDate = (date) => {
    changeMonth(new Date(date));
  };

  useEffect(async () => {
    await getUserBoardsData(userId);
    await getEvents(userId);
    goToDate(yearMonth);
  }, []);

  useEffect(async () => {
    await getEvents(userId);
    goToDate(yearMonth);
  }, [userBoards]);

  return (
    <Wrapper>
      <div className="topLeft">
        <BackButton component={Link} to="/">
          BACK
        </BackButton>
      </div>
      <div className="topRight">
        <Button
          onClick={goToday}
          sx={{ fontSize: "17px", marginRight: "20px" }}
        >
          Today
        </Button>
        <FilterBoardSelector
          boardIds={boardIds}
          showBoard={showBoard}
          setShowBoard={setShowBoard}
        />
      </div>
      <Header
        changeMonth={changeMonth}
        monthName={monthName}
        yearName={yearName}
      />
      <Box sx={{
        bgcolor: 'secondary.light',
        padding: '15px'
      }}>
        <DayLabel>
          {weekdays.map((day) => (
            <Typography
            	key={day}
              variant="body1"
              sx={{
                mt: 1.5,
              }}
            >
              {day.toLowerCase()}
            </Typography>
          ))}
        </DayLabel>
        {dates.map((week) => (
          <WeekContainer key={week}>
            {week.map((day) => (
              <DateSquare showBoard={showBoard} key={day} id={day}/>
            ))}
          </WeekContainer>
        ))}
      </Box>
    </Wrapper>
  );
};

export default Calendar;
