'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Code, Palette, ShoppingCart, Users, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation'; // استيراد useRouter

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

const iconComponents = {
  Code,
  Palette,
  ShoppingCart,
  Users,
};

export default function ServicesSection() {
  const router = useRouter(); // تهيئة useRouter
  const [services, setServices] = useState<Service[]>([]);
  const [activeService, setActiveService] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const cubeRef = useRef<HTMLDivElement>(null);
  
  // 3D rotation values
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 12 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 12 });

  useEffect(() => {
    // Load services data
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => setServices(data.services))
      .catch(() => {
        // Fallback data
        setServices([
          {
            id: "1",
            title: "Full Stack Development",
            description: "Complete web application development from concept to deployment using modern technologies.",
            icon: "Code",
            features: ["Frontend Development", "Backend Development", "Database Design", "API Integration"]
          },
          {
            id: "2",
            title: "Web Design & UI/UX",
            description: "Creating intuitive and responsive user interfaces that provide excellent user experience.",
            icon: "Palette",
            features: ["Responsive Design", "User Interface", "User Experience", "Prototyping"]
          },
          {
            id: "3",
            title: "E-commerce Solutions",
            description: "Building scalable e-commerce platforms with secure payment integration.",
            icon: "ShoppingCart",
            features: ["Online Stores", "Payment Integration", "Inventory Management", "Order Tracking"]
          },
          {
            id: "4",
            title: "Consulting & Support",
            description: "Technical consulting and ongoing support for web development projects.",
            icon: "Users",
            features: ["Technical Consulting", "Code Review", "Performance Optimization", "Maintenance"]
          }
        ]);
      });
  }, []);

  // Auto-rotate cube
  useEffect(() => {
    if (!isAutoRotating) return;
    
    const interval = setInterval(() => {
      setActiveService(prev => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [services.length, isAutoRotating]);

  // Update cube rotation based on active service
  useEffect(() => {
    const rotations = [
      { x: 0, y: 0 },      // Front
      { x: 0, y: -90 },    // Right
      { x: 0, y: -180 },   // Back
      { x: 0, y: -270 },   // Left
    ];
    
    if (services.length > 0) {
      const rotation = rotations[activeService] || rotations[0];
      rotateX.set(rotation.x);
      rotateY.set(rotation.y);
    }
  }, [activeService, services.length, rotateX, rotateY]);

  const handleServiceClick = (index: number) => {
    setActiveService(index);
    setIsAutoRotating(false);
    
    // Resume auto-rotation after 10 seconds
    setTimeout(() => setIsAutoRotating(true), 10000);
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

  if (services.length === 0) {
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

  return (
    <section id="services" className="py-20 bg-muted/20">
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
              My <span className="text-gradient">Services</span>
            </h2>
            <p className="text-responsive-base text-muted-foreground max-w-2xl mx-auto">
              Comprehensive web development services tailored to bring your digital vision to life
            </p>
          </motion.div>
{/* Service Navigation */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="flex flex-wrap gap-4 p-2 bg-card rounded-xl border border-border/50">
              {services.map((service, index) => {
                const IconComponent = iconComponents[service.icon as keyof typeof iconComponents] || Code;
                return (
                  <motion.button
                    key={service.id}
                    onClick={() => handleServiceClick(index)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      index === activeService
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="hidden sm:inline">{service.title}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* 3D Rotating Cube */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <div className="relative">
                <div 
                  className="w-80 h-80 perspective-1000"
                  style={{ perspective: '1000px' }}
                >
                  <motion.div
                    ref={cubeRef}
                    className="relative w-full h-full preserve-3d cursor-pointer"
                    style={{
                      transformStyle: 'preserve-3d',
                      rotateX: springRotateX,
                      rotateY: springRotateY,
                    }}
                  >
                    {services.map((service, index) => {
                      const IconComponent = iconComponents[service.icon as keyof typeof iconComponents] || Code;
                      const transforms = [
                        'translateZ(140px)',           // Front
                        'rotateY(90deg) translateZ(140px)',  // Right
                        'rotateY(180deg) translateZ(140px)', // Back
                        'rotateY(-90deg) translateZ(140px)', // Left
                      ];

                      return (
                        <div
                          key={service.id}
                          className={`absolute inset-0 w-80 h-80 bg-gradient-to-br from-card to-accent border border-border/50 rounded-2xl flex flex-col items-center justify-center p-6 text-center shadow-lg ${
                            index === activeService ? 'ring-2 ring-primary-500' : ''
                          }`}
                          style={{
                            transform: transforms[index],
                            backfaceVisibility: 'hidden',
                          }}
                          onClick={() => handleServiceClick(index)}
                        >
                          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mb-6">
                            <IconComponent className="w-10 h-10 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-3">
                            {service.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      );
                    })}
                  </motion.div>
                </div>

                {/* Rotation Indicators */}
                <div className="flex justify-center mt-8 gap-2">
                  {services.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleServiceClick(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeService
                          ? 'bg-primary-500 scale-125'
                          : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Service Details */}
            <motion.div variants={itemVariants} className="space-y-8">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Service Header */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                      {(() => {
                        const IconComponent = iconComponents[services[activeService]?.icon as keyof typeof iconComponents] || Code;
                        return <IconComponent className="w-8 h-8 text-white" />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {services[activeService]?.title}
                      </h3>
                      <p className="text-muted-foreground">
                        Professional {services[activeService]?.title.toLowerCase()}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {services[activeService]?.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">What's Included:</h4>
                  <div className="grid gap-3">
                    {services[activeService]?.features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border/50"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" />
                        <span className="text-foreground font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA Button - تم تعديله للانتقال إلى صفحة الاتصال */}
                <motion.button
                  className="btn-primary group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/contact')} // الانتقال إلى صفحة الاتصال
                >
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          
        </motion.div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transformStyle: preserve-3d;
        }
      `}</style>
    </section>
  );
}