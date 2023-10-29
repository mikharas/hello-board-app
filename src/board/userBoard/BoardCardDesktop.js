import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Card, Button, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

const BoardCardFront = styled(Card)`
  width: 300px;
  height: 200px;
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
  height: 200px;
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
const BoardCard = ({ title, id, setOpenDialog, setWillBeDeleted }) => {
  const [selected, setSelected] = useState(false);
  const history = useHistory();
  return (
    <Card
      onMouseEnter={() => setSelected(true)}
      onMouseLeave={() => setSelected(false)}
      sx={{
        bgcolor: "secondary.light",
        width: 300,
        height: 200,
        borderRadius: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!selected ? (
        <Typography variant="h3">{title}</Typography>
      ) : (
        <>
          <Button
            onClick={() => history.push(`/boards/${id}`)}
            sx={{
              textDecoration: "none",
              fontSize: "16px",
              color: "black",
            }}
          >
            OPEN
          </Button>
          <Button
            sx={{ fontSize: "16px", color: "black" }}
            onClick={() => {
              setWillBeDeleted(id);
              setOpenDialog(true);
            }}
          >
            Delete
          </Button>
        </>
      )}
    </Card>
  );
};

export default React.memo(BoardCard);
