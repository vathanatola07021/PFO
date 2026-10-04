'use client';

import React from 'react';
import { SkillCategoryData } from '@/data/portfolioData';

interface StackProps {
  categories: SkillCategoryData[];
}

export default function Stack({ categories }: StackProps) {
  return (
    <section id="stack">
      <div className="head rv in">
        <h2>Technical Capabilities</h2>
        <p>
          IT support operations and hardware maintenance on one side, network infrastructure and digital tools on the other.
        </p>
      </div>

      <div className="stack">
        {categories.map((category, idx) => (
          <div key={idx} className="card rv in">
            <h3>{category.name}</h3>
            <ul>
              {category.skills.map((skill, sIdx) => (
                <li key={sIdx}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
