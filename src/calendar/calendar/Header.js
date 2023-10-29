import React, { useState } from "react";
import styled from "styled-components";
import { Button, Typography, Menu, MenuItem } from "@mui/material";

const years = [...Array(100).keys()].map((i) => i + 2000);

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getDate = (month, year) => new Date(year, months.indexOf(month), 1);

const HeaderStyled = styled.div`
  width: 100%;
  height 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = ({ monthName, yearName, changeMonth }) => {
  const [anchorMonth, setAnchorMonth] = useState();
  const [anchorYear, setAnchorYear] = useState();

  const handleMonthClick = (event) => {
    setAnchorMonth(event.currentTarget);
  };

  const handleYearClick = (event) => {
    setAnchorYear(event.currentTarget);
  };

  const handleMonthClose = () => setAnchorMonth(null);
  const handleYearClose = () => setAnchorYear(null);

  return (
    <HeaderStyled>
      <Button onClick={handleMonthClick} sx={{ textTransform: "none" }}>
        <Typography variant="h1" sx={{ fontSize: "40px", color: "black" }}>
          {monthName.toLowerCase() + "."}
        </Typography>
      </Button>
      <Button onClick={handleYearClick}>
        <Typography variant="h2" sx={{ fontSize: "20px" }}>
          {yearName}
        </Typography>
      </Button>
      <Menu
        anchorEl={anchorMonth}
        keepMounted
        open={Boolean(anchorMonth)}
        onClose={handleMonthClose}
      >
        {months.map((month) => (
          <MenuItem
          	key={month}
            onClick={() => {
              changeMonth(getDate(month, yearName));
              handleMonthClose();
            }}
          >
            {month}
          </MenuItem>
        ))}
      </Menu>
      <Menu
        anchorEl={anchorYear}
        keepMounted
        open={Boolean(anchorYear)}
        onClose={handleYearClose}
      >
        {years.map((year) => (
          <MenuItem
            key={year}
            onClick={() => {
              changeMonth(getDate(monthName, year));
              handleYearClose();
            }}
          >
            {year}
          </MenuItem>
        ))}
      </Menu>
    </HeaderStyled>
  );
};

export default React.memo(Header);
