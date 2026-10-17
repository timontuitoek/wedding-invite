import React, { createContext, useContext, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const IntroContext = createContext(null);

export function IntroProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const replayKeyRef = useRef(0);
  const [replayKey, setReplayKey] = useState(0);
  const [isIntroVisible, setIntroVisible] = useState(location.pathname === '/');

  const replayHome = () => {
    const nextKey = replayKeyRef.current + 1;
    replayKeyRef.current = nextKey;
    setReplayKey(nextKey);
    navigate('/', { state: { introKey: nextKey } });
  };

  return (
    <IntroContext.Provider
      value={{
        replayKey,
        replayHome,
        isIntroVisible,
        setIntroVisible,
      }}
    >
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  const context = useContext(IntroContext);

  if (!context) {
    throw new Error('useIntro must be used within an IntroProvider');
  }

  return context;
}
