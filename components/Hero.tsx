'use client';

import React, { useState, useEffect } from 'react';
import { ProfileData } from '@/data/portfolioData';

interface HeroProps {
  profile: ProfileData;
}

export default function Hero({ profile }: HeroProps) {
  const [displayText, setDisplayText] = useState('');
  const roles = profile.typewriterRoles && profile.typewriterRoles.length > 0
    ? profile.typewriterRoles
    : [profile.roleTitle];

  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (rm) {
      setDisplayText(roles[0]);
      return;
    }

    let roleIdx = 0;
    let charIdx = 0;
    let dir = 1;
    let timeoutId: NodeJS.Timeout;

    const tick = () => {
      const currentRole = roles[roleIdx];
      charIdx += dir;
      setDisplayText(currentRole.slice(0, charIdx));

      let delay = dir > 0 ? 80 : 35;

      if (charIdx === currentRole.length) {
        dir = -1;
        delay = 2400; // Pause at full word
      } else if (charIdx === 0) {
        dir = 1;
        roleIdx = (roleIdx + 1) % roles.length;
        delay = 500; // Pause before typing next word
      }

      timeoutId = setTimeout(tick, delay);
    };

    timeoutId = setTimeout(tick, 600);

    return () => clearTimeout(timeoutId);
  }, [roles]);

  return (
    <section className="hero">
      <div className="hero-grid">
        <div>
          <h1 className="ld" style={{ '--i': 0 } as React.CSSProperties}>
            Hi, I&apos;m <span className="nm">{profile.fullName}</span>
          </h1>
          <p className="role ld" style={{ '--i': 1 } as React.CSSProperties} aria-label={profile.roleTitle}>
            <span id="role">{displayText || roles[0]}</span>
            <span className="caret" aria-hidden="true" />
          </p>
          <p className="lede ld" style={{ '--i': 2 } as React.CSSProperties}>
            {profile.introLede}
          </p>
          <div className="btns ld" style={{ '--i': 3 } as React.CSSProperties}>
            <a className="btn p" href="#simulator">
              <span className="btn-content">Live 3D Engine</span>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </a>
            <a className="btn g" href="#work">
              <span className="btn-content">Explore Work</span>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            {profile.email && (
              <a className="btn g btn-icon btn-email" href={`mailto:${profile.email}`} title={`Email: ${profile.email}`} aria-label={`Email: ${profile.email}`}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            )}
            {profile.telegramUrl && (
              <a className="btn g btn-icon btn-telegram" href={profile.telegramUrl} target="_blank" rel="noopener" title={`Telegram: ${profile.telegramUrl}`} aria-label={`Telegram: ${profile.telegramUrl}`}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
              </a>
            )}
            {profile.githubUrl && (
              <a className="btn g btn-icon btn-github" href={profile.githubUrl} target="_blank" rel="noopener" title="GitHub Profile" aria-label="GitHub Profile">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            )}
            {profile.facebookUrl && (
              <a className="btn g btn-icon btn-facebook" href={profile.facebookUrl} target="_blank" rel="noopener" title="Facebook Profile" aria-label="Facebook Profile">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Interactive Avatar Capsule */}
        <div className="ava ld" style={{ '--i': 2 } as React.CSSProperties}>
          <div className="ring">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/profile.jpg" alt={profile.fullName} className="avatar-photo" />
          </div>
          <div className="fl f1">
            <i>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            </i>
            {profile.badgeExperience}
          </div>
          <div className="fl f2">
            <i>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />
              </svg>
            </i>
            {profile.badgeLanguage}
          </div>
        </div>
      </div>
    </section>
  );
}
