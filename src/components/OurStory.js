import React, { useState, useEffect } from 'react';
import siteConfig from '../siteConfig';
import Card from './ui/Card';

function OurStory() {
  const images = siteConfig.ourStory?.memories?.images || [];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { howWeMet, proposal } = siteConfig.ourStory || {};

  // Automatically change image every 3 seconds
  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="modern-section min-h-screen pt-28 pb-26">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="section-header text-4xl sm:text-title font-semibold text-sage-900">
            Our Story
          </h1>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            The journey that brought us together
          </p>
        </div>

        {/* Partner Stories */}
        <div className="space-y-12 mb-20">
          {/* Partner 1's Story */}
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="overflow-hidden rounded-[1.5rem] border border-white/70 shadow-[0_20px_50px_rgba(38,56,47,0.14)]">
                <img
                  src={siteConfig.ourStory?.partner1Story?.image}
                  alt={siteConfig.couple.name1}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <Card className="modern-panel flex-1 p-8">
              <h2 className="text-3xl font-semibold text-sage-900 mb-4">
                {siteConfig.ourStory?.partner1Story?.name}
              </h2>
              <p className="text-lg text-sage-700 leading-relaxed">
                {siteConfig.ourStory?.partner1Story?.story}
              </p>
            </Card>
          </div>

          {/* Partner 2's Story */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="overflow-hidden rounded-[1.5rem] border border-white/70 shadow-[0_20px_50px_rgba(38,56,47,0.14)]">
                <img
                  src={siteConfig.ourStory?.partner2Story?.image}
                  alt={siteConfig.couple.name2}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <Card className="modern-panel flex-1 p-8">
              <h2 className="text-3xl font-semibold text-sage-900 mb-4">
                {siteConfig.ourStory?.partner2Story?.name}
              </h2>
              <p className="text-lg text-sage-700 leading-relaxed">
                {siteConfig.ourStory?.partner2Story?.story}
              </p>
            </Card>
          </div>
        </div>

        {/* How We Met */}
        {howWeMet?.enabled && (
          <div className="mb-20">
            <Card className="modern-panel p-8 lg:p-12">
              <h2 className="text-3xl font-semibold text-sage-900 mb-6 text-center">
                {howWeMet.title}
              </h2>
              <p className="text-lg text-sage-700 leading-relaxed max-w-3xl mx-auto text-center">
                {howWeMet.story}
              </p>
            </Card>
          </div>
        )}

        {/* Proposal */}
        {proposal?.enabled && (
          <div className="mb-20">
            <Card className="modern-panel p-8 lg:p-12">
              <h2 className="text-3xl font-semibold text-sage-900 mb-6 text-center">
                {proposal.title}
              </h2>
              {proposal.image && (
                <div className="mb-6 max-w-2xl mx-auto">
                  <img
                    src={proposal.image}
                    alt="Proposal"
                    className="w-full rounded-2xl shadow-[0_12px_32px_rgba(38,56,47,0.10)]"
                  />
                </div>
              )}
              <p className="text-lg text-sage-700 leading-relaxed max-w-3xl mx-auto text-center">
                {proposal.story}
              </p>
            </Card>
          </div>
        )}

        {/* Memories Gallery */}
        {images.length > 0 && (
          <div>
            <div className="text-center mb-8">
              <p className="text-xl text-sage-600 italic">
                "{siteConfig.ourStory?.memories?.intro}"
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="relative h-96 overflow-hidden rounded-[1.5rem] border border-white/70 shadow-[0_20px_50px_rgba(38,56,47,0.14)]">
                <img
                  src={images[currentImageIndex]}
                  alt={`Memory ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={goToPreviousImage}
                      className="absolute left-3 top-1/2 min-h-11 min-w-11 -translate-y-1/2 rounded-full bg-[var(--w-border)]/80 p-3 shadow-apple backdrop-blur-sm transition-colors hover:bg-[var(--w-border)] sm:left-4"
                      aria-label="Previous image"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={goToNextImage}
                      className="absolute right-3 top-1/2 min-h-11 min-w-11 -translate-y-1/2 rounded-full bg-[var(--w-border)]/80 p-3 shadow-apple backdrop-blur-sm transition-colors hover:bg-[var(--w-border)] sm:right-4"
                      aria-label="Next image"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`h-2 rounded-full transition-all ${
                            currentImageIndex === index
                              ? 'w-8 bg-[var(--w-accent)]'
                              : 'w-2 bg-[var(--w-border)]/60 hover:bg-[var(--w-border)]'
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OurStory;
