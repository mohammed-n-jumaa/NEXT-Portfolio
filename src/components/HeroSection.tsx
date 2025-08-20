'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Download, ExternalLink } from 'lucide-react';
import AdminModal from './AdminModal';

interface HeroData {
  name: string;
  title: string;
  description: string;
  image: string;
  socialLinks: {
    linkedin: string;
    github: string;
    email: string;
  };
}

export default function HeroSection() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [showAdminModal, setShowAdminModal] = useState(false);

  useEffect(() => {
    // Load hero data from JSON
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => setHeroData(data.hero))
      .catch(() => {
        // Fallback data
        setHeroData({
          name: "Mohammed Nedal",
          title: "Full Stack Developer",
          description: "I craft dynamic, user-friendly web applications using modern technologies. Passionate about creating scalable solutions that make a difference.",
          image: "https://ui-avatars.com/api/?name=Mohammed+Nedal&background=9b5de5&color=fff&size=400",
          socialLinks: {
            linkedin: "https://linkedin.com/in/mohammed-nedal",
            github: "https://github.com/mohammed-nedal",
            email: "mohammed.n.jumaa@gmail.com"
          }
        });
      });
  }, []);

  if (!heroData) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center bg-background">
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-tl from-blue-500 to-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-6">
            {/* Greeting */}
            <p className="text-purple-500 font-medium text-lg">
              Hello, I'm
            </p>

            {/* Name */}
            <h1 className="text-responsive-xl font-bold text-foreground leading-tight">
              {heroData.name}
            </h1>

            {/* Title */}
            <div className="text-responsive-lg text-gradient font-semibold">
              {heroData.title}
            </div>

            {/* Description */}
            <p className="text-responsive-base text-muted-foreground max-w-2xl leading-relaxed">
              {heroData.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-8">
              <button
                onClick={() => {
                  const projectsSection = document.querySelector('#projects');
                  projectsSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary"
              >
                Explore My Work
                <ExternalLink className="ml-2 w-4 h-4" />
              </button>

              <a
                href="/Mohammed Nedal CV.pdf"
                download
                className="btn-secondary"
              >
                Download CV
                <Download className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Profile Image */}
              <div
                className="relative w-80 h-80 rounded-full overflow-hidden cursor-pointer border-4 border-purple-500/20"
                onClick={() => setShowAdminModal(true)}
                style={{
                  background: 'linear-gradient(135deg, rgba(155, 93, 229, 0.1), rgba(58, 12, 163, 0.1))'
                }}
              >
                <img
                  src={heroData.image}
                  alt={heroData.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = 'https://ui-avatars.com/api/?name=Mohammed+Nedal&background=9b5de5&color=fff&size=400';
                  }}
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                  <span className="text-white text-sm font-medium px-4 py-2 bg-black/50 rounded-full backdrop-blur-sm">
                    Click for Admin
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-muted-foreground cursor-pointer animate-bounce">
            <span className="text-sm font-medium">Scroll Down</span>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Admin Modal */}
      <AdminModal 
        isOpen={showAdminModal} 
        onClose={() => setShowAdminModal(false)} 
      />
    </section>
  );
}