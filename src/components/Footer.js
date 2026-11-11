import React from 'react';
import siteConfig from '../siteConfig';

function Footer() {
  const { tagline } = siteConfig.footer || {};

  return (
    <footer className="border-t border-ivory-200 bg-gradient-to-b from-ivory-100 to-ivory-50 py-10 text-sage-800 mt-auto">
      <div className="section-container">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Tagline */}
          <p className="text-sm italic text-sage-600 text-center md:text-left">
            "{tagline}"
          </p>

          {/* Couple Name */}
          <p className="text-sm font-semibold text-sage-900">
            {siteConfig.couple.displayName}
          </p>

          {/* Creator mark */}
          <div className="text-center text-xs font-medium uppercase tracking-[0.2em] text-sage-500">
            <span aria-label="Trademark Timon 2026">™ timon@2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
