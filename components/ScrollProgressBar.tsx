'use client';

import React, { useEffect, useState } from 'react';

export default function ScrollProgressBar() {
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement;
      const maxScroll = Math.max(1, h.scrollHeight - window.innerHeight);
      setScale(window.scrollY / maxScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div id="bar" style={{ transform: `scaleX(${scale})` }} />;
}
