'use client';

import React, { useState, useEffect } from 'react';
import { ProfileData } from '@/data/portfolioData';

interface NavbarProps {
  profile: ProfileData;
}

const NAV_ITEMS = [
  { href: '#top', label: 'Intro' },
  { href: '#simulator', label: '3D Engine' },
  { href: '#work', label: 'Work' },
  { href: '#stack', label: 'Stack' },
  { href: '#about', label: 'About' },
  { href: '#writing', label: 'Writing' }
];

export default function Navbar({ profile }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item =>
        item.href.startsWith('#') ? document.querySelector(item.href) : null
      );

      let current = 0;
      sections.forEach((sec, idx) => {
        if (sec && sec.getBoundingClientRect().top < window.innerHeight * 0.4) {
          current = idx;
        }
      });
      setActiveIndex(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openMobileNav = () => {
    setMobileOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeMobileNav = () => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  };

  const handleReplay = () => {
    closeMobileNav();
    if (typeof (window as any).replaySplashScreen === 'function') {
      (window as any).replaySplashScreen();
    }
  };

  return (
    <>
      <nav aria-label="Main Navigation">
        <a className="nav-brand-logo" href="#top" aria-label={`${profile.fullName} Logo, Back to top`} title={`${profile.fullName} Portfolio`}>
          <span className="brand-logo-emblem">
            <svg viewBox="0 0 36 36" width="34" height="34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="navEmblemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3fe0ff" />
                  <stop offset="50%" stopColor="#8b7bff" />
                  <stop offset="100%" stopColor="#ff7bcf" />
                </linearGradient>
                <linearGradient id="emblemCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(63, 224, 255, 0.2)" />
                  <stop offset="100%" stopColor="rgba(139, 123, 255, 0.08)" />
                </linearGradient>
              </defs>
              <polygon points="18,2 33,10.5 33,25.5 18,34 3,25.5 3,10.5" stroke="url(#navEmblemGrad)" strokeWidth="2.2" fill="rgba(8, 14, 26, 0.95)" />
              <polygon points="18,7.5 28,13 28,23 18,28.5 8,23 8,13" stroke="rgba(63, 224, 255, 0.45)" strokeWidth="1.2" fill="url(#emblemCoreGrad)" />
              <path d="M12.5 13.5v9h5.5" stroke="url(#navEmblemGrad)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18.5 13.5l3.5 9 3.5-9" stroke="#3fe0ff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="18" cy="18" r="2" fill="#3fe0ff" />
            </svg>
          </span>
        </a>

        <div className="links">
          {NAV_ITEMS.map((item, idx) => (
            <a
              key={item.href}
              href={item.href}
              className={idx === activeIndex ? 'on' : ''}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="nav-right-actions">
          <a className="pill nav-pill-btn" href="#contact">
            Get in touch
          </a>
          <button
            id="navMobileToggle"
            className="nav-mobile-toggle"
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobileNavDrawer"
            onClick={mobileOpen ? closeMobileNav : openMobileNav}
          >
            <span className="hamb-line" />
            <span className="hamb-line" />
            <span className="hamb-line" />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Glass Drawer */}
      <div
        id="mobileNavDrawer"
        className={`mobile-nav-drawer ${mobileOpen ? 'open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <div
          className="mobile-drawer-backdrop"
          id="mobileDrawerBackdrop"
          onClick={closeMobileNav}
        />
        <div className="mobile-drawer-sheet">
          <div className="mobile-drawer-header">
            <span className="mobile-drawer-title">{profile.fullName}</span>
            <button
              id="mobileNavClose"
              className="mobile-drawer-close"
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMobileNav}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mobile-drawer-links">
            <a
              href="#top"
              className={`mobile-nav-link ${activeIndex === 0 ? 'on' : ''}`}
              onClick={closeMobileNav}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Intro
            </a>
            <a
              href="#simulator"
              className={`mobile-nav-link ${activeIndex === 1 ? 'on' : ''}`}
              onClick={closeMobileNav}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              3D Engine
            </a>
            <a
              href="#work"
              className={`mobile-nav-link ${activeIndex === 2 ? 'on' : ''}`}
              onClick={closeMobileNav}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              Work
            </a>
            <a
              href="#stack"
              className={`mobile-nav-link ${activeIndex === 3 ? 'on' : ''}`}
              onClick={closeMobileNav}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              Stack
            </a>
            <a
              href="#about"
              className={`mobile-nav-link ${activeIndex === 4 ? 'on' : ''}`}
              onClick={closeMobileNav}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              About
            </a>
            <a
              href="#writing"
              className={`mobile-nav-link ${activeIndex === 5 ? 'on' : ''}`}
              onClick={closeMobileNav}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              Writing
            </a>
            <a
              href="#contact"
              className="mobile-nav-link mobile-pill-link"
              onClick={closeMobileNav}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Get in Touch
            </a>
          </div>

          <div className="mobile-drawer-bottom">
            <button
              type="button"
              className="mobile-replay-btn"
              id="mobileReplayBtn"
              onClick={handleReplay}
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 4v6h6M23 20v-6h-6" />
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
              </svg>
              Replay 3D Splash
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
