import React, { useCallback, useEffect } from 'react';
import siteConfig from '../siteConfig';
import SplashIntro from './SplashIntro';
import EventPage from './EventPage';
import Gifts from './Gifts';
import UploadPhotos from './UploadPhotos';
import { useIntro } from '../contexts/IntroContext';

function HomePage() {
  const { replayKey, isIntroVisible, setIntroVisible } = useIntro();

  const completeIntro = useCallback(() => {
    setIntroVisible(false);
  }, [setIntroVisible]);

  useEffect(() => {
    setIntroVisible(true);
    window.scrollTo({ top: 0, behavior: 'auto' });

    return () => {
      setIntroVisible(false);
      document.body.style.overflow = '';
    };
  }, [replayKey, setIntroVisible]);

  useEffect(() => {
    if (!isIntroVisible) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isIntroVisible]);

  const weddingDate = new Date(siteConfig.wedding.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen">
      {isIntroVisible && (
        <SplashIntro
          replayKey={replayKey}
          onComplete={completeIntro}
        />
      )}
      {/* Hero Section */}
      <div id="home" className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-sage-950 scroll-mt-20">
        <img
          src={`${process.env.PUBLIC_URL}/Beige%20and%20Blue%20Floral%20Wedding%20Logo.png`}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sage-950/65 via-sage-900/75 to-sage-950/95" />
        <div className="relative z-10 flex max-w-4xl flex-col items-center justify-center px-4 text-center text-white sm:px-8">
          <img
            src={`${process.env.PUBLIC_URL}/Beige%20and%20Blue%20Floral%20Wedding%20Logo.png`}
            alt="Chela and Josiah's wedding logo"
            width={2000}
            height={2000}
            className={`mb-8 w-40 rounded-full object-cover shadow-apple-xl transition-all duration-700 sm:w-52 ${
              isIntroVisible ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
            }`}
          />
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.35em] text-rose-200 sm:text-base">
            We are getting married
          </p>
          <h1 className="text-5xl font-semibold tracking-tight drop-shadow-lg sm:text-display-sm lg:text-display">
            {siteConfig.couple.name1} <span className="text-rose-300">&amp;</span> {siteConfig.couple.name2}
          </h1>
          <p className="mt-6 text-2xl font-medium text-white sm:text-3xl">
            {weddingDate}
          </p>
          <p className="mt-4 max-w-2xl text-base text-ivory-100 sm:text-lg">
            {siteConfig.wedding.location}
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {siteConfig.features.events?.enabled && <EventPage embedded />}
      {siteConfig.features.uploadPhotos?.enabled && <UploadPhotos embedded />}
      {siteConfig.features.registry?.enabled && <Gifts embedded />}
    </div>
  );
}

export default HomePage;
