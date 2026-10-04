'use client';

import React from 'react';
import { ProfileData } from '@/data/portfolioData';

interface FooterProps {
  profile: ProfileData;
}

export default function Footer({ profile }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleReplay = () => {
    if (typeof (window as any).replaySplashScreen === 'function') {
      (window as any).replaySplashScreen();
    }
  };

  return (
    <footer>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px', marginBottom: '12px', flexWrap: 'wrap' }}>
        {profile.telegramUrl && (
          <a
            href={profile.telegramUrl}
            target="_blank"
            rel="noopener"
            style={{ color: 'var(--mute)', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#4ed2ff')}
            onMouseOut={(e) => (e.currentTarget.style.color = 'var(--mute)')}
            title={`Telegram: ${profile.telegramHandle || '@lai_vathanatola'}`}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
            </svg>
            Telegram
          </a>
        )}

        {profile.githubUrl && (
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener"
            style={{ color: 'var(--mute)', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseOut={(e) => (e.currentTarget.style.color = 'var(--mute)')}
            title={`GitHub: ${profile.githubUrl}`}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
        )}

        {profile.facebookUrl && (
          <a
            href={profile.facebookUrl}
            target="_blank"
            rel="noopener"
            style={{ color: 'var(--mute)', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#619eff')}
            onMouseOut={(e) => (e.currentTarget.style.color = 'var(--mute)')}
            title="Facebook Profile"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </a>
        )}

        {profile.email && (
          <a
            href={`mailto:${profile.email}`}
            style={{ color: 'var(--mute)', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }}
            onMouseOver={(e) => (e.currentTarget.style.color = 'var(--cy)')}
            onMouseOut={(e) => (e.currentTarget.style.color = 'var(--mute)')}
            title={`Email: ${profile.email}`}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Email
          </a>
        )}

        <button
          type="button"
          className="footer-replay-btn"
          onClick={handleReplay}
          title="Replay 3D Splash Screen Intro"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 4v6h6M23 20v-6h-6" />
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
          </svg>
          Replay Intro
        </button>
      </div>

      <span>
        © <span id="yr">{currentYear}</span> {profile.fullName} · Frontend &amp; Backend Developer
      </span>
      <span>Built with React, Next.js &amp; Three.js WebGL</span>
    </footer>
  );
}
