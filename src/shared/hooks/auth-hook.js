import { useState, useCallback, useEffect } from 'react';

let logoutTimer;
const IDLETIMEOUT = 1000 * 60 * 60 * 6;

const useAuth = () => {
  const [userId, setUserId] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(undefined);
  const [token, setToken] = useState(false);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);

    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + IDLETIMEOUT); // one hour

    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem('userData', JSON.stringify({
      userId: uid,
      token,
      expiration: tokenExpirationDate.toISOString(),
    }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);

  const resetTimeout = useCallback(() => {
    const newTokenExpirationDate = new Date(new Date().getTime() + IDLETIMEOUT); // one hour
    setTokenExpirationDate(newTokenExpirationDate);
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      if (logoutTimer) clearTimeout(logoutTimer);
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate, resetTimeout]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData
      && storedData.token
      && new Date(storedData.expiration) > new Date() // stored date is in the future
    ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  return { token, login, logout, resetTimeout, userId };
};

export { useAuth };
