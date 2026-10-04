'use client';

import React from 'react';
import { ArticleData, ProfileData } from '@/data/portfolioData';

interface WritingProps {
  profile: ProfileData;
  articles: ArticleData[];
}

export default function Writing({ profile, articles }: WritingProps) {
  return (
    <section id="writing">
      <div className="head rv in">
        <h2>Writing</h2>
        {profile.substackUrl && (
          <a className="src" href={profile.substackUrl} target="_blank" rel="noopener">
            Read the Notebook
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        )}
      </div>

      <div className="bento">
        {articles.map((article) => (
          <a
            key={article.id}
            className="card post w2 rv in"
            style={{ gridColumn: 'span 2' }}
            href={article.url}
          >
            <span className="meta">{article.metaInfo}</span>
            <h3>{article.title}</h3>
            <p>{article.summary}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
