import React, { useState } from "react";
import {
  Paper,
  Button,
  Stack,
  TextField,
  FormControlLabel,
  Checkbox,
  styled,
  Typography,
} from "@mui/material";
import { css } from "@emotion/css";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  username: yup
    .string("Enter a username")
    .min(3, "Username should be of minimum 3 characters length")
    .required("Username is required"),
  password: yup
    .string("Enter a password")
    .min(3, "Password should be of minimum 3 characters length")
    .required("Password is required"),
});

const TextFieldStyled = styled(TextField)`
  width: 100%;
  margin: 5px 0;
`;

const Auth = ({ isLoggedIn, login, register }) => {
  const history = useHistory();
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleFormSubmit = (username, password) => {
    if (isLoginMode) {
      login(username, password);
    } else {
      register(username, password);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const { username, password } = values;
      handleFormSubmit(username, password);
    },
  });

  if (isLoggedIn) {
    history.goBack();
  }

  return (
    <Stack
      sx={{
        width: "100%",
        height: "calc(100vh - 50px)",
        bgcolor: "secondary.light",
      }}
    >
      <Paper
        elevation={3}
        className={css`
          background: white;
          height: 500px;
          border: 1px solid lightgray;
          border-radius: 10px;
          margin: auto;
          padding: 50px;
          align-items: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 400px;

          h2 {
            font-weight: normal;
            padding: 0;
            margin-top: 5px;
            margin-bottom: 25px;
          }
        `}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "55px",
            mt: 0,
          }}
        >
          hello.
        </Typography>
        <Typography variant="h3" sx={{ my: "10px", mb: "20px" }}>
          {isLoginMode ? "Welcome back!" : "New user!"}
        </Typography>
        <form
          className={css`
            display: flex;
            flex-direction: column;
            width: 100%;
            align-items: center;
          `}
          onSubmit={formik.handleSubmit}
        >
          <TextFieldStyled
            id="username"
            name="username"
            margin="dense"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextFieldStyled
            id="password"
            name="password"
            margin="dense"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            type="password"
          />
          <div
            className={css`
              display: flex;
              gap: 10px;
              margin-top: 30px;
              justify-content: center;
            `}
          >
            <Button
              className={css`
                box-shadow: none;
              `}
              variant="contained"
              type="submit"
            >
              {isLoginMode ? "Login" : "Signup"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => setIsLoginMode(!isLoginMode)}
              type="Button"
            >
              {`Switch to ${isLoginMode ? "Sign up" : "Log in"}`}
            </Button>
          </div>
        </form>
      </Paper>
    </Stack>
  );
};

export default Auth;
