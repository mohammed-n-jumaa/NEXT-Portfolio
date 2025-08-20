'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingIndex, setTypingIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Load testimonials data
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => setTestimonials(data.testimonials))
      .catch(() => {
        // Fallback data
        setTestimonials([
          {
            id: "1",
            name: "Sarah Johnson",
            role: "Project Manager",
            company: "Tech Solutions",
            content: "Mohammed delivered exceptional work on our web platform. His attention to detail and problem-solving skills are outstanding. The project was completed on time and exceeded our expectations.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=100&h=100&fit=crop&crop=face"
          },
          {
            id: "2",
            name: "Ahmed Ali",
            role: "CEO",
            company: "Digital Agency",
            content: "Working with Mohammed was a pleasure. He understood our requirements perfectly and delivered a high-quality solution on time. His communication skills are excellent.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
          },
          {
            id: "3",
            name: "Lisa Chen",
            role: "Startup Founder",
            company: "InnovateTech",
            content: "Mohammed's expertise in full-stack development helped us launch our platform successfully. He's professional, reliable, and delivers quality work. Highly recommended!",
            rating: 5,
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
          },
          {
            id: "4",
            name: "David Rodriguez",
            role: "CTO",
            company: "StartupHub",
            content: "Exceptional developer with great problem-solving skills. Mohammed transformed our ideas into a beautiful, functional website that our users love.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
          },
          {
            id: "5",
            name: "Emma Thompson",
            role: "Marketing Director",
            company: "Creative Studio",
            content: "Mohammed created an amazing e-commerce platform for us. The design is modern, the functionality is flawless, and the performance is outstanding.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
          }
        ]);
      });
  }, []);

  // Auto slide
  useEffect(() => {
    if (testimonials.length === 0 || !isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [testimonials.length, isAutoPlay]);

  // Typing effect
  useEffect(() => {
    if (!testimonials[currentIndex]) return;
    
    setIsTyping(true);
    setTypingIndex(0);
    setIsComplete(false);
    
    const content = testimonials[currentIndex].content;
    const typingInterval = setInterval(() => {
      setTypingIndex((prevIndex) => {
        if (prevIndex >= content.length) {
          setIsTyping(false);
          setIsComplete(true);
          clearInterval(typingInterval);
          return content.length;
        }
        return prevIndex + 1;
      });
    }, 30);

    return () => clearInterval(typingInterval);
  }, [currentIndex, testimonials]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  const restartTyping = () => {
    setTypingIndex(0);
    setIsTyping(true);
    setIsComplete(false);
  };

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

  const bubbleVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const floatingBubbleVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (testimonials.length === 0) {
    return (
      <section className="py-20 bg-muted/20">
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

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-muted/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-tl from-secondary-500/10 to-primary-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Floating Quote Icons */}
        <motion.div
          className="absolute top-1/4 left-1/6 text-primary-500/20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Quote className="w-8 h-8" />
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 right-1/6 text-secondary-500/20"
          animate={{
            y: [0, -15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        >
          <Quote className="w-6 h-6" />
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Client <span className="text-gradient">Testimonials</span>
            </h2>
            <p className="text-responsive-base text-muted-foreground max-w-2xl mx-auto">
              What my clients say about working with me and the results we've achieved together
            </p>
            
            {/* Control Buttons */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <motion.button
                onClick={toggleAutoPlay}
                className="flex items-center gap-2 px-4 py-2 bg-card hover:bg-accent rounded-lg border border-border/50 transition-colors text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isAutoPlay ? 'Pause' : 'Play'}
              </motion.button>
              
              <motion.button
                onClick={restartTyping}
                className="flex items-center gap-2 px-4 py-2 bg-card hover:bg-accent rounded-lg border border-border/50 transition-colors text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="w-4 h-4" />
                Restart
              </motion.button>
            </div>
          </motion.div>

          {/* Main Testimonial */}
          <motion.div variants={itemVariants} className="relative max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={bubbleVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative"
              >
                {/* Main Speech Bubble */}
                <motion.div 
                  className="relative bg-card rounded-3xl p-8 md:p-12 border border-border/50 shadow-2xl backdrop-blur-sm"
                  variants={floatingBubbleVariants}
                  animate="animate"
                >
                  {/* Decorative Quote Icon */}
                  <div className="absolute -top-6 left-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-lg">
                      <Quote className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-8 pt-4">
                    {/* Rating Stars */}
                    <div className="flex justify-center gap-1">
                      {[...Array(5)].map((_, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          <Star
                            className={`w-6 h-6 ${
                              index < currentTestimonial.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-muted-foreground/30'
                            }`}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Testimonial Text with Enhanced Typing Effect */}
                    <div className="text-center relative">
                      <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed font-medium min-h-[120px] flex items-center justify-center">
                        <span className="relative">
                          "{currentTestimonial.content.slice(0, typingIndex)}"
                          {isTyping && (
                            <motion.span
                              className="inline-block w-0.5 h-6 bg-primary-500 ml-1"
                              animate={{ opacity: [1, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity }}
                            />
                          )}
                          {isComplete && (
                            <motion.span
                              className="inline-block ml-2"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              ✨
                            </motion.span>
                          )}
                        </span>
                      </blockquote>
                      
                      {/* Typing Progress Bar */}
                      <div className="w-full max-w-xs mx-auto mt-4 h-1 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(typingIndex / currentTestimonial.content.length) * 100}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                    </div>

                    {/* Client Information */}
                    <motion.div 
                      className="flex items-center justify-center gap-6 pt-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary-500/20 shadow-lg">
                          <Image
                            src={currentTestimonial.image}
                            alt={currentTestimonial.name}
                            width={80}
                            height={80}
                            className="object-cover"
                            onError={(e) => {
                              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentTestimonial.name)}&background=9b5de5&color=fff`;
                            }}
                          />
                        </div>
                        {/* Online Indicator */}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-card flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <h4 className="font-bold text-foreground text-lg">
                          {currentTestimonial.name}
                        </h4>
                        <p className="text-primary-500 font-medium">
                          {currentTestimonial.role}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {currentTestimonial.company}
                        </p>
                        
                        {/* Verified Badge */}
                        <div className="flex items-center justify-center gap-1 mt-2">
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span className="text-xs text-blue-500 font-medium">Verified Client</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Speech Bubble Tail */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-card border-r border-b border-border/50 transform rotate-45 shadow-lg"></div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between absolute top-1/2 -translate-y-1/2 w-full px-4 pointer-events-none">
              <motion.button
                onClick={prevTestimonial}
                className="w-12 h-12 bg-card hover:bg-accent border border-border/50 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 pointer-events-auto group hover:scale-110"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6 text-foreground group-hover:text-primary-500 transition-colors" />
              </motion.button>

              <motion.button
                onClick={nextTestimonial}
                className="w-12 h-12 bg-card hover:bg-accent border border-border/50 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 pointer-events-auto group hover:scale-110"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-6 h-6 text-foreground group-hover:text-primary-500 transition-colors" />
              </motion.button>
            </div>
          </motion.div>

          {/* Testimonial Indicators */}
          <motion.div variants={itemVariants} className="flex justify-center gap-3">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-10 h-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full'
                    : 'w-3 h-3 bg-muted-foreground/30 hover:bg-muted-foreground/50 rounded-full'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </motion.div>

          {/* All Testimonials Grid */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-card rounded-xl p-6 border transition-all duration-300 cursor-pointer group ${
                  index === currentIndex
                    ? 'border-primary-500/50 bg-primary-500/5 shadow-lg shadow-primary-500/10'
                    : 'border-border/50 hover:border-primary-500/30 hover:shadow-lg'
                }`}
                onClick={() => goToTestimonial(index)}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Mini Quote Icon */}
                <div className="absolute -top-3 left-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <Quote className="w-3 h-3 text-white" />
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  {/* Rating */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className={`w-4 h-4 ${
                          starIndex < testimonial.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    "{testimonial.content}"
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=9b5de5&color=fff`;
                        }}
                      />
                    </div>
                    <div>
                      <h5 className="font-medium text-foreground text-sm">
                        {testimonial.name}
                      </h5>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                    
                    {/* Active Indicator */}
                    {index === currentIndex && (
                      <div className="ml-auto">
                        <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Statistics */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border/50">
            {[
              { label: 'Happy Clients', value: testimonials.length + '+', icon: '😊' },
              { label: 'Average Rating', value: '5.0', icon: '⭐' },
              { label: 'Projects Completed', value: '50+', icon: '🚀' },
              { label: 'Response Time', value: '< 24h', icon: '⚡' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-4 bg-card rounded-xl border border-border/50 hover:border-primary-500/30 transition-colors"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div variants={itemVariants} className="text-center space-y-6 bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-primary-500/10 rounded-2xl p-8 border border-primary-500/20">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground">
                Ready to join these happy clients?
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Let's create something amazing together and add your success story to this collection.
              </p>
            </div>
            
            <motion.button
              onClick={() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/contact';
                }
              }}
              className="btn-primary group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
              <motion.span
                className="ml-2 inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}