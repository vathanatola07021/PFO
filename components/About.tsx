'use client';

import React from 'react';
import { ProfileData, EducationFactData } from '@/data/portfolioData';

interface AboutProps {
  profile: ProfileData;
  educationFacts: EducationFactData[];
}

export default function About({ profile, educationFacts }: AboutProps) {
  return (
    <section id="about">
      <div className="about">
        <div className="rv in">
          <h2 style={{ marginBottom: '28px' }}>About</h2>
          <p className="big">{profile.aboutQuote}</p>
          <p>{profile.aboutDescription}</p>
        </div>

        <dl className="dl rv in">
          {educationFacts.map((fact, idx) => (
            <div key={idx}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
