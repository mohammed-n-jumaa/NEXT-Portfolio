'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ServicesSection from '@/components/ServicesSection';
import ExperienceSection from '@/components/ExperienceSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';

interface PortfolioData {
  hero?: any;
  projects?: any[];
  skills?: {
    frontend?: any[];
    backend?: any[];
    database?: any[];
    tools?: any[];
  };
  services?: any[];
  experience?: any[];
  testimonials?: any[];
}

export default function HomePage() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/portfolio');
        const data = await response.json();
        setPortfolioData(data);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Functions to check if sections have data
  const hasProjects = portfolioData.projects && portfolioData.projects.length > 0;
  
  const hasSkills = portfolioData.skills && (
    (portfolioData.skills.frontend && portfolioData.skills.frontend.length > 0) ||
    (portfolioData.skills.backend && portfolioData.skills.backend.length > 0) ||
    (portfolioData.skills.database && portfolioData.skills.database.length > 0) ||
    (portfolioData.skills.tools && portfolioData.skills.tools.length > 0)
  );
  
  const hasServices = portfolioData.services && portfolioData.services.length > 0;
  
  const hasExperience = portfolioData.experience && portfolioData.experience.length > 0;
  
  const hasTestimonials = portfolioData.testimonials && portfolioData.testimonials.length > 0;
  
  const hasHero = portfolioData.hero && portfolioData.hero.name;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section - Always show if data exists */}
      {hasHero && <HeroSection />}
      
      {/* Projects Section - Only show if has projects */}
      {hasProjects && <ProjectsSection />}
      
      {/* Skills Section - Only show if has skills */}
      {hasSkills && <SkillsSection />}
      
      {/* Services Section - Only show if has services */}
      {hasServices && <ServicesSection />}
      
      {/* Experience Section - Only show if has experience */}
      {hasExperience && <ExperienceSection />}
      
      {/* Testimonials Section - Only show if has testimonials */}
      {hasTestimonials && <TestimonialsSection />}
      
      <Footer />
    </main>
  );
}