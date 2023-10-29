import React, { useEffect, useState, useContext } from "react";
import { useParams, NavLink } from "react-router-dom";
import styled from "styled-components";
import { Grid, Stack, IconButton, Button, Typography } from "@mui/material";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CalendarToday } from "@mui/icons-material";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { isMobile } from "react-device-detect";
import BoardCardMobile from "./BoardCardMobile";
import BoardCardDesktop from "./BoardCardDesktop";
import WarningDialog from "../../shared/components/WarningDialog";


const Wrapper = styled.div`
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  .link {
    color: inherit;
  }

  .MuiIconButton-root.icon {
    font-size: 30px;
  }

  .icon {
    position: absolute;
    right: 20px;
    top: 20px;
  }
`;

const BoardList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  border-radius: 15px;
  width: 100%;
  background: #ebecf0;
`;

const LogoutButton = styled(Button)`
  position: absolute;
  font-size: 17px;
  left: 30px;
  top: 30px;
  color: red;
`;

const NewBoard = styled(Button)``;

const UserBoards = ({
  boardsList,
  getUserBoardsData,
  postUserBoard,
  delUserBoard,
  logout,
}) => {
  const { userId } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [willBeDeleted, setWillBeDeleted] = useState(null);

  const BoardCard = isMobile ? <BoardCardMobile /> : <BoardCardDesktop />;

  const createBoardHandler = () => {
    postUserBoard(userId);
  };

  const deleteBoardHandler = (boardId) => {
    delUserBoard(boardId);
  };

  useEffect(() => {
    getUserBoardsData(userId);
  }, []);

  if (!boardsList) {
    return <h1>Is loading boards...</h1>;
  }

  return (
    <Stack direction="column" sx={{ alignItems: "center" }}>
      <WarningDialog
        open={openDialog}
        onContinue={() => {
          deleteBoardHandler(willBeDeleted);
          setOpenDialog(false);
        }}
        onClose={() => setOpenDialog(false)}
        msg="Are you sure you want to delete this board?"
      />
      <Button
        onClick={() => {
          logout();
        }}
        sx={{
          position: "absolute",
          fontSize: 17,
          left: 30,
          top: 30,
        }}
      >
        Logout
      </Button>
      <Typography
        variant="h1"
        sx={{
          fontSize: "50px",
          my: "60px",
          mt: "100px",
        }}
      >
        boards.
      </Typography>
      <IconButton
        sx={{
          position: "absolute",
          right: 30,
          top: 30,
        }}
      >
        <NavLink
          className="link"
          to={`/calendar/${moment(new Date()).format("YYYY-MM")}`}
        >
          <CalendarToday sx={{ color: "secondary.main" }} />
        </NavLink>
      </IconButton>
      <Grid
        container
        spacing={2}
        sx={{
          width: "80%",
          mb: 10,
        }}
      >
        {boardsList.map(({ id, title }) => (
          <Grid
            item
            xs={3}
            key={id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
            }}
          >
            {isMobile ? (
              <BoardCardMobile
                title={title}
                id={id}
                setOpenDialog={setOpenDialog}
                setWillBeDeleted={setWillBeDeleted}
              />
            ) : (
              <BoardCardDesktop
                title={title}
                id={id}
                setOpenDialog={setOpenDialog}
                setWillBeDeleted={setWillBeDeleted}
              />
            )}
          </Grid>
        ))}
      </Grid>
      <NewBoard onClick={createBoardHandler}>Create New Board</NewBoard>
    </Stack>
  );
};

export default UserBoards;
