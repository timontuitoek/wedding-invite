import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import siteConfig from '../siteConfig';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Generate navigation links based on enabled features
  const getNavLinks = () => {
    const links = [];
    const routes = {
      ourStory: '/our-story',
      events: '/events',
      uploadPhotos: '/upload-photos',
      registry: '/registry',
      travel: '/travel',
      faq: '/faq',
    };

    Object.entries(siteConfig.features).forEach(([key, feature]) => {
      if (feature.enabled && key !== 'homepage' && routes[key]) {
        links.push({
          path: routes[key],
          label: feature.label,
          key,
        });
      }
    });

    return links;
  };

  const navLinks = getNavLinks();
  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--w-bg)]/98 backdrop-blur-apple shadow-apple border-b border-[var(--w-border)]'
          : 'bg-[var(--w-dark)] backdrop-blur-sm'
      }`}
    >
      <div className="section-container">
        <div className="flex justify-between items-center py-4">
          {/* Logo / Home button */}
          <Link
            to="/"
            aria-label="Wedding logo - Home"
            className="block w-11 h-11 rounded-lg overflow-hidden transition-all duration-200 hover:opacity-80 hover:scale-105 active:scale-95"
          >
            <img
              src={`${process.env.PUBLIC_URL}/Beige%20and%20Blue%20Floral%20Wedding%20Logo.png`}
              alt="Wedding logo - Home"
              width={2000}
              height={2000}
              className="w-11 h-11 object-cover rounded-lg"
              loading="lazy"
            />
          </Link>

          {/* Hamburger Icon for Mobile */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className={`focus:outline-none p-2 ${
                scrolled ? 'text-sage-900' : 'text-white'
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Links for Large Screens */}
          <div className={`hidden lg:flex lg:items-center lg:space-x-8`}>
            {navLinks.map((link) => (
              <Link
                key={link.key}
                to={link.path}
                className={`text-sm font-medium transition-all duration-200 px-2 py-1 ${
                  isActive(link.path)
                    ? scrolled
                      ? 'text-rose-800 border-b-2 border-rose-300'
                      : 'text-white border-b-2 border-rose-300/60'
                    : scrolled
                    ? 'text-[var(--w-text)] hover:text-[var(--w-text)]'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            className={`lg:hidden pb-6 space-y-4 animate-slide-up ${
              scrolled ? 'text-sage-900' : 'text-white'
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.key}
                to={link.path}
                onClick={toggleMenu}
                className={`block py-2 px-4 rounded-lg transition-colors ${
                  isActive(link.path)
                    ? scrolled
                      ? 'bg-rose-50 text-rose-800 font-medium'
                      : 'bg-white/20 text-white font-medium'
                    : scrolled
                    ? 'hover:bg-ivory-100'
                    : 'hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
