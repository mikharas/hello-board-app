import React, { useState, useContext } from 'react';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import AuthContext from '../../shared/context/authContext';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validators';
import Input from '../../shared/components/Input';

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormBox = styled.div`
  width: 450px;
  height: 500px;
  border: 1px solid lightgray;
  border-radius: 15px;
  margin: auto;
  padding: 15px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    font-weight: normal;
    padding: 0;
    margin-top: 5px;
    margin-bottom: 25px;
  }
`;

const Logo = styled.h1`
  font-size: 55px;
  margin-top: 0;
  margin-bottom: 10px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  margin-top: 25px;
  width: 100%;
  display: flex;
  justify-content: center;

  .button {
    margin: 5px;
  }
`;

const ErrorMsg = styled.h3`
  color: red;
`;

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm({
    account_name: {
      val: '',
      helperText: '',
      isValid: false,
    },
    password: {
      val: '',
      helperText: '',
      isValid: false,
    },
  }, false);
  const auth = useContext(AuthContext);
  const {
    error, sendRequest,
  } = useHttpClient();

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
        },
        formState.inputs.account_name.isValid && formState.inputs.password.isValid,
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
        },
        formState.inputs.account_name.isValid && formState.inputs.password.isValid,
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          'POST',
          JSON.stringify({
            account_name: formState.inputs.account_name.val,
            password: formState.inputs.password.val,
          }),
          {
            'Content-Type': 'application/json',
          },
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          'POST',
          JSON.stringify({
            account_name: formState.inputs.account_name.val,
            password: formState.inputs.password.val,
          }),
          {
            'Content-Type': 'application/json',
          });
        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    }
  };

  return (
    <Wrapper>
      <FormBox>
        <Logo>hello.</Logo>
        <h2>{isLoginMode ? 'Welcome back!' : 'New user!'}</h2>
        <Form onSubmit={authSubmitHandler}>
          {
            error && <ErrorMsg>{error}</ErrorMsg>
          }
          <Input
            id="account_name"
            label="User Name"
            helperText="Please enter a username."
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            helperText="Password should be minimum 5 characters."
            onInput={inputHandler}
            validators={[VALIDATOR_MINLENGTH(5)]}
          />
          <ButtonsWrapper>
            <Button
              disabled={!formState.isValid}
              type="submit"
              disableElevation
              className="button"
              variant="contained"
              color="default"
            >
              {isLoginMode ? 'Login' : 'Signup'}
            </Button>
            <Button
              disableElevation
              className="button"
              variant="contained"
              color="secondary"
              onClick={switchModeHandler}
            >
              {`switch to ${isLoginMode ? 'Sign up' : 'Log in'}`}
            </Button>
          </ButtonsWrapper>
        </Form>
      </FormBox>
    </Wrapper>
  );
};

export default Auth;
