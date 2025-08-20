'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, ChevronRight, Building2 } from 'lucide-react';

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
}

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [activeExperience, setActiveExperience] = useState(0);

  useEffect(() => {
    // Load experience data
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => setExperiences(data.experience))
      .catch(() => {
        // Fallback data
        setExperiences([
          {
            id: "1",
            title: "Software Engineer",
            company: "Jocom",
            period: "June 2025 - Present",
            location: "Amman, Jordan",
            description: "Working on various software development projects, focusing on web applications and system integration.",
            responsibilities: [
              "Developing and maintaining web applications",
              "Collaborating with cross-functional teams",
              "Code review and optimization",
              "Technical problem solving"
            ]
          },
          {
            id: "2",
            title: "Full-Stack Web Development Trainee",
            company: "Orange Coding Academy",
            period: "September 2024 - January 2025",
            location: "Amman, Jordan",
            description: "Completed intensive Full-Stack Web Development bootcamp, working on real-world projects.",
            responsibilities: [
              "Built interactive and responsive user interfaces",
              "Developed web applications with PHP and Laravel",
              "Database design and optimization",
              "Team collaboration and project management"
            ]
          }
        ]);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const timelineVariants = {
    hidden: { opacity: 0, scaleY: 0 },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  if (experiences.length === 0) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-responsive-lg font-bold text-foreground">
              Professional <span className="text-gradient">Experience</span>
            </h2>
            <p className="text-responsive-base text-muted-foreground max-w-2xl mx-auto">
              My journey through various roles and the valuable experience I've gained along the way
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Timeline */}
            <motion.div variants={itemVariants} className="relative">
              {/* Vertical Line */}
              <motion.div
                variants={timelineVariants}
                className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500 transform origin-top"
              />

              {/* Experience Nodes */}
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    variants={nodeVariants}
                    className="relative flex items-start gap-6 cursor-pointer group"
                    onClick={() => setActiveExperience(index)}
                  >
                    {/* Timeline Node */}
                    <motion.div
                      className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-4 border-background shadow-lg transition-all duration-300 ${
                        index === activeExperience
                          ? 'bg-gradient-to-br from-primary-500 to-secondary-500 scale-110'
                          : 'bg-card group-hover:bg-primary-500/10 border-border'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Building2 
                        className={`w-6 h-6 transition-colors ${
                          index === activeExperience 
                            ? 'text-white' 
                            : 'text-muted-foreground group-hover:text-primary-500'
                        }`} 
                      />
                    </motion.div>

                    {/* Experience Summary */}
                    <motion.div 
                      className={`flex-1 p-4 rounded-lg border transition-all duration-300 ${
                        index === activeExperience
                          ? 'bg-primary-500/5 border-primary-500/30'
                          : 'bg-card border-border group-hover:border-primary-500/20'
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className={`font-bold transition-colors ${
                            index === activeExperience ? 'text-primary-500' : 'text-foreground'
                          }`}>
                            {exp.title}
                          </h3>
                          <p className="text-muted-foreground font-medium">{exp.company}</p>
                        </div>
                        <ChevronRight className={`w-5 h-5 transition-all duration-300 ${
                          index === activeExperience 
                            ? 'text-primary-500 rotate-90' 
                            : 'text-muted-foreground group-hover:translate-x-1'
                        }`} />
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Experience Details */}
            <motion.div variants={itemVariants} className="lg:sticky lg:top-24">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeExperience}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card rounded-2xl p-8 border border-border/50 shadow-lg"
                >
                  {/* Header */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">
                          {experiences[activeExperience]?.title}
                        </h3>
                        <p className="text-lg text-primary-500 font-medium">
                          {experiences[activeExperience]?.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        <span>{experiences[activeExperience]?.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <span>{experiences[activeExperience]?.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">About the Role</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {experiences[activeExperience]?.description}
                      </p>
                    </div>

                    {/* Responsibilities */}
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">Key Responsibilities</h4>
                      <div className="space-y-3">
                        {experiences[activeExperience]?.responsibilities.map((responsibility, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground leading-relaxed">{responsibility}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Navigation Dots */}
                  <div className="flex justify-center gap-2 mt-8 pt-6 border-t border-border/50">
                    {experiences.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveExperience(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === activeExperience
                            ? 'bg-primary-500 scale-125'
                            : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}