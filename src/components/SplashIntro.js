import React, { useEffect, useState } from 'react';

const LOGO_PATH = `${process.env.PUBLIC_URL}/Beige%20and%20Blue%20Floral%20Wedding%20Logo.png`;
const FULL_DURATION = 2200;
const REDUCED_DURATION = 150;

function SplashIntro({ replayKey, onComplete }) {
  const [phase, setPhase] = useState('visible');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const duration = prefersReducedMotion ? REDUCED_DURATION : FULL_DURATION;
    const exitDelay = prefersReducedMotion ? 0 : duration - 550;

    setPhase('visible');
    const exitTimer = window.setTimeout(() => setPhase('exiting'), exitDelay);
    const completeTimer = window.setTimeout(onComplete, duration);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete, replayKey]);

  return (
    <div
      className={`splash-intro splash-intro-${phase}`}
      role="status"
      aria-label="Wedding introduction"
    >
      <img
        src={LOGO_PATH}
        alt="Wedding logo"
        className="splash-intro-logo"
        width={2000}
        height={2000}
      />
    </div>
  );
}

export default SplashIntro;
