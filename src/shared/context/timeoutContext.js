import { createContext } from 'react';

const TimeoutContext = createContext({
  resetTimeout: () => {},
});

export default TimeoutContext;
