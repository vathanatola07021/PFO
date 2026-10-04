import React from 'react';
import SplashScreen from '@/components/SplashScreen';
import BackgroundCanvas from '@/components/BackgroundCanvas';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import SpatialSimulator from '@/components/SpatialSimulator';
import Projects from '@/components/Projects';
import Stack from '@/components/Stack';
import About from '@/components/About';
import Writing from '@/components/Writing';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import {
  profileData,
  projectsData,
  skillCategoriesData,
  educationFactsData,
  articlesData
} from '@/data/portfolioData';

export default function HomePage() {
  return (
    <>
      {/* 3D Cybernetic Splash Screen */}
      <SplashScreen profile={profileData} />

      {/* 3D Background Three.js Canvas */}
      <BackgroundCanvas />

      {/* Top Reading Progress Bar */}
      <ScrollProgressBar />

      {/* Top Floating Pill Navigation & Mobile Drawer */}
      <Navbar profile={profileData} />

      {/* Main Content Sections */}
      <main id="top">
        <Hero profile={profileData} />
        <Marquee />
        <SpatialSimulator />
        <Projects projects={projectsData} />
        <Stack categories={skillCategoriesData} />
        <About profile={profileData} educationFacts={educationFactsData} />
        <Writing profile={profileData} articles={articlesData} />
        <Contact profile={profileData} />
      </main>

      {/* Footer */}
      <Footer profile={profileData} />

      {/* Scroll Reveal Observer for Animations */}
      <ScrollReveal />
    </>
  );
}
