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

    const sections = ['home', 'events', 'gifts', 'travel', 'upload-photos', 'faq'];
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
          ? 'bg-[var(--w-bg)]/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(38,56,47,0.10)] border-b border-[var(--w-border)]'
          : 'bg-[var(--w-dark)]/70 backdrop-blur-md'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between py-3">
          {/* Logo / Home button */}
          <Link
            to="/"
            onClick={(event) => {
              event.preventDefault();
              setIsOpen(false);
              replayHome();
            }}
            aria-label="Wedding logo - Home"
            className="group flex items-center gap-3 transition-all duration-200 active:scale-95"
          >
            <img
              src={`${process.env.PUBLIC_URL}/Beige%20and%20Blue%20Floral%20Wedding%20Logo.png`}
              alt="Wedding logo - Home"
              width={2000}
              height={2000}
              className="h-11 w-11 rounded-xl object-cover shadow-[0_4px_14px_rgba(38,56,47,0.18)] transition-transform duration-200 group-hover:scale-105"
              loading="lazy"
            />
            <span className={`hidden text-sm font-semibold tracking-wide sm:block ${
              scrolled ? 'text-sage-900' : 'text-white'
            }`}>
              {siteConfig.couple.displayName}
            </span>
          </Link>

          {/* Hamburger Icon for Mobile */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              className={`rounded-xl p-2 transition-colors focus-visible:ring-2 focus-visible:ring-rose-300 ${
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
          <div className="hidden items-center gap-2 lg:flex">
            {navLinks.map((link) => {
              const continuous = location.pathname === '/' && ['homepage', 'events', 'registry', 'uploadPhotos', 'travel', 'faq'].includes(link.key);
              const sectionId = link.key === 'homepage' ? 'home' : link.key === 'events' ? 'events' : link.key === 'registry' ? 'gifts' : link.key === 'uploadPhotos' ? 'upload-photos' : link.key;
              const active = continuous ? activeSection === sectionId : isActive(link.path);
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
                className={`rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  active
                    ? scrolled
                      ? 'bg-rose-100 text-rose-900'
                      : 'bg-white/15 text-white'
                    : scrolled
                    ? 'text-[var(--w-text)] hover:bg-ivory-100'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
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
            className={`modern-panel mt-3 rounded-2xl p-3 lg:hidden animate-slide-up ${
              scrolled ? 'text-sage-900' : 'text-white'
            }`}
          >
            {navLinks.map((link) => {
              const continuous = location.pathname === '/' && ['homepage', 'events', 'registry', 'uploadPhotos', 'travel', 'faq'].includes(link.key);
              const sectionId = link.key === 'homepage' ? 'home' : link.key === 'events' ? 'events' : link.key === 'registry' ? 'gifts' : link.key === 'uploadPhotos' ? 'upload-photos' : link.key;
              const active = continuous ? activeSection === sectionId : isActive(link.path);
              return <Link
                key={link.key}
                to={link.path}
                onClick={(event) => {
                  if (continuous) {
                    event.preventDefault();
                    scrollToSection(sectionId);
                  }
                  toggleMenu();
                }}
                className={`block rounded-xl px-4 py-3 text-sm transition-colors ${
                  active
                    ? scrolled
                      ? 'bg-rose-100 text-rose-900 font-semibold'
                      : 'bg-white/20 text-white font-semibold'
                    : scrolled
                    ? 'text-sage-800 hover:bg-ivory-100'
                    : 'text-white/90 hover:bg-white/10'
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
