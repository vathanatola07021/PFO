'use client';

import React from 'react';
import { marqueeSkills } from '@/data/portfolioData';

export default function Marquee() {
  return (
    <div className="marq" aria-hidden="true">
      <div>
        {marqueeSkills.map((skill, index) => (
          <span key={`m1-${index}`}>{skill}</span>
        ))}
        {marqueeSkills.map((skill, index) => (
          <span key={`m2-${index}`}>{skill}</span>
        ))}
      </div>
    </div>
  );
}
