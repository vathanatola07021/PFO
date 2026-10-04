'use client';

import React from 'react';
import { ProjectData } from '@/data/portfolioData';

interface ProjectsProps {
  projects: ProjectData[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section id="work">
      <div className="head rv in">
        <h2>Systems & Practical Experience</h2>
        <p>
          Hands-on IT support at ACLEDA University, campus network lab configurations, and workstation maintenance.
        </p>
      </div>

      <div className="bento">
        {projects.map((project) => (
          <article key={project.id} className={`card ${project.colSpan} rv in`}>
            <span className="tag">{project.categoryTag}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>

            {(project.terminalCommand || project.terminalOutput) && (
              <div className="term">
                {project.terminalCommand && (
                  <>
                    {project.terminalCommand}
                    <br />
                  </>
                )}
                {project.terminalOutput && (
                  <>
                    <i>PASS</i> {project.terminalOutput}
                  </>
                )}
              </div>
            )}

            <div className="chips">
              {project.chips.map((chip, idx) => (
                <span key={idx}>{chip}</span>
              ))}
            </div>

            {project.githubUrl ? (
              <a className="src" href={project.githubUrl} target="_blank" rel="noopener">
                View source
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            ) : project.liveUrl ? (
              <a className="src" href={project.liveUrl} target="_blank" rel="noopener">
                Live Preview
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
