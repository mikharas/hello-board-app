import React from 'react';
import { CircularProgress, Backdrop } from '@mui/material';
import styled from 'styled-components';

const Background = styled(Backdrop)`
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingOverlay = () => (
  <Background open>
    <CircularProgress
      color="secondary"
      size="50px"
      thickness={5}
      value={50}
    />
  </Background>
);

export default LoadingOverlay;
