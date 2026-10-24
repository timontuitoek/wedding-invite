import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import siteConfig from '../siteConfig';
import { useIntro } from '../contexts/IntroContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const { isIntroVisible, replayHome } = useIntro();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return undefined;
    }

    const sections = ['home', 'events', 'upload-photos', 'gifts'];
    const updateActiveSection = () => {
      const marker = window.scrollY + 120;
      let currentSection = 'home';

      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= marker) currentSection = id;
      });

      setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Generate navigation links based on enabled features
  const getNavLinks = () => {
    const links = [];
    const routes = {
      homepage: '/',
      events: '/events',
      uploadPhotos: '/upload-photos',
      registry: '/gifts',
      travel: '/travel',
      faq: '/faq',
      messageToCouple: '/message-to-couple',
    };

    Object.entries(siteConfig.features).forEach(([key, feature]) => {
      if (feature.enabled && routes[key]) {
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
      aria-hidden={isIntroVisible}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isIntroVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
      } ${
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
            onClick={(event) => {
              event.preventDefault();
              setIsOpen(false);
              replayHome();
            }}
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
            {navLinks.map((link) => {
              const continuous = location.pathname === '/' && ['homepage', 'events', 'registry', 'uploadPhotos'].includes(link.key);
              const sectionId = link.key === 'homepage' ? 'home' : link.key === 'events' ? 'events' : link.key === 'registry' ? 'gifts' : link.key === 'uploadPhotos' ? 'upload-photos' : null;
              const active = continuous ? activeSection === (link.key === 'homepage' ? 'home' : link.key === 'events' ? 'events' : link.key === 'registry' ? 'gifts' : 'upload-photos') : isActive(link.path);
              return <Link
                key={link.key}
                to={link.path}
                onClick={(event) => {
                  if (continuous) {
                    event.preventDefault();
                    scrollToSection(sectionId);
                    setIsOpen(false);
                  }
                }}
                className={`text-sm font-medium transition-all duration-200 px-2 py-1 ${
                  active
                    ? scrolled
                      ? 'text-rose-800 border-b-2 border-rose-300'
                      : 'text-white border-b-2 border-rose-300/60'
                    : scrolled
                    ? 'text-[var(--w-text)] hover:text-[var(--w-text)]'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </Link>;
            })}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            className={`lg:hidden pb-6 space-y-4 animate-slide-up ${
              scrolled ? 'text-sage-900' : 'text-white'
            }`}
          >
            {navLinks.map((link) => {
              const continuous = location.pathname === '/' && ['homepage', 'events', 'registry', 'uploadPhotos'].includes(link.key);
              const active = continuous ? activeSection === (link.key === 'homepage' ? 'home' : link.key === 'events' ? 'events' : link.key === 'registry' ? 'gifts' : 'upload-photos') : isActive(link.path);
              return <Link
                key={link.key}
                to={link.path}
                onClick={(event) => {
                  if (continuous) {
                    event.preventDefault();
                    scrollToSection(link.key === 'homepage' ? 'home' : link.key === 'events' ? 'events' : link.key === 'registry' ? 'gifts' : 'upload-photos');
                  }
                  toggleMenu();
                }}
                className={`block py-2 px-4 rounded-lg transition-colors ${
                  active
                    ? scrolled
                      ? 'bg-rose-50 text-rose-800 font-medium'
                      : 'bg-white/20 text-white font-medium'
                    : scrolled
                    ? 'hover:bg-ivory-100'
                    : 'hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>;
            })}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
