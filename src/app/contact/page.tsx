'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Clock, ArrowLeft, CheckCircle, Globe, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully! I\'ll get back to you soon. 🚀', {
          duration: 5000,
          icon: '✉️'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again or contact me directly.', {
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'mohammed.n.jumaa@gmail.com',
      href: 'mailto:mohammed.n.jumaa@gmail.com',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      description: 'Drop me a line anytime'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+962-787665773',
      href: 'tel:+962787665773',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      description: 'Call me during business hours'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Amman, Jordan',
      href: 'https://maps.google.com/?q=Amman,Jordan',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      description: 'Available for local meetings'
    },
    {
      icon: Clock,
      label: 'Response Time',
      value: 'Within 24 hours',
      href: '#',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      description: 'Usually respond much faster'
    }
  ];

  const reasonsToWorkTogether = [
    "🚀 Fast response time (within 24 hours)",
    "💬 Clear communication throughout the project",
    "🎯 High-quality code and modern practices",
    "🔧 Post-launch support and maintenance",
    "💰 Competitive pricing and flexible packages",
    "🌟 Proven track record with satisfied clients"
  ];

  const services = [
    { name: 'Full Stack Development', icon: '🚀' },
    { name: 'Web Design & UI/UX', icon: '🎨' },
    { name: 'E-commerce Solutions', icon: '🛒' },
    { name: 'Technical Consulting', icon: '💡' }
  ];

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

  const floatingVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        {/* Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tr from-secondary-500/10 to-primary-500/10 rounded-full blur-3xl" />
          
          {/* Floating Elements */}
          <motion.div
            className="absolute top-1/3 right-1/6 w-4 h-4 bg-primary-500/30 rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/5 w-6 h-1 bg-secondary-500/40 rounded-full"
            animate={{
              x: [0, 30, 0],
              rotate: [0, 180, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center space-y-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary-500 transition-colors mb-8 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
              
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-24 h-24 mx-auto bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mb-6"
                >
                  <MessageCircle className="w-12 h-12 text-white" />
                </motion.div>
                
                <h1 className="text-responsive-xl font-bold text-foreground">
                  Let's Build Something <span className="text-gradient">Amazing</span> Together
                </h1>
                <p className="text-responsive-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Have a project in mind? I'd love to hear about it. Whether it's a complete web application, 
                  a redesign, or technical consulting, let's discuss how we can bring your vision to life.
                </p>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Contact Form */}
              <motion.div variants={itemVariants}>
                <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-2xl relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
                  
                  <div className="relative space-y-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                          <Send className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-foreground">Send Message</h2>
                          <p className="text-muted-foreground">I'll respond within 24 hours</p>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-4 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary-500 transition-all duration-300 backdrop-blur-sm"
                            placeholder="Your full name"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-4 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary-500 transition-all duration-300 backdrop-blur-sm"
                            placeholder="your.email@example.com"
                          />
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                          Subject *
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-4 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary-500 transition-all duration-300 backdrop-blur-sm"
                          placeholder="What's this about?"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-4 py-4 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary-500 transition-all duration-300 resize-none backdrop-blur-sm"
                          placeholder="Tell me about your project, timeline, budget, or any specific requirements..."
                        />
                      </motion.div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        {isSubmitting ? (
                          <div className="flex items-center justify-center gap-3">
                            <div className="loading-dots">
                              <span></span>
                              <span></span>
                              <span></span>
                            </div>
                            <span>Sending Message...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-3">
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            <span>Send Message</span>
                          </div>
                        )}
                      </motion.button>

                      <motion.p
                        className="text-xs text-muted-foreground text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        By sending this message, you agree to be contacted regarding your inquiry.
                      </motion.p>
                    </form>
                  </div>
                </div>
              </motion.div>

              {/* Contact Information & Additional Content */}
              <motion.div variants={itemVariants} className="space-y-8">
                {/* Contact Information */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-foreground">Get in Touch</h3>
                  
                  <div className="grid gap-4">
                    {contactInfo.map((info, index) => {
                      const IconComponent = info.icon;
                      return (
                        <motion.div
                          key={info.label}
                          variants={floatingVariants}
                          transition={{ delay: index * 0.1 }}
                          className="group"
                        >
                          {info.href && info.href !== '#' ? (
                            <a
                              href={info.href}
                              target={info.href.startsWith('http') ? '_blank' : undefined}
                              rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="flex items-center gap-4 p-4 bg-card hover:bg-accent rounded-2xl border border-border/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10"
                            >
                              <div className={`w-14 h-14 ${info.bgColor} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                                <IconComponent className={`w-7 h-7 ${info.color}`} />
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground">{info.label}</h4>
                                <p className="text-muted-foreground font-medium">{info.value}</p>
                                <p className="text-xs text-muted-foreground/70">{info.description}</p>
                              </div>
                            </a>
                          ) : (
                            <div className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border/50">
                              <div className={`w-14 h-14 ${info.bgColor} rounded-xl flex items-center justify-center`}>
                                <IconComponent className={`w-7 h-7 ${info.color}`} />
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground">{info.label}</h4>
                                <p className="text-muted-foreground font-medium">{info.value}</p>
                                <p className="text-xs text-muted-foreground/70">{info.description}</p>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Services Overview */}
                <div className="bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-2xl p-6 border border-primary-500/20">
                  <h4 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary-500" />
                    What I Can Help You With
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {services.map((service, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="flex items-center gap-2 p-3 bg-card/50 rounded-lg"
                      >
                        <span className="text-lg">{service.icon}</span>
                        <span className="text-sm font-medium text-foreground">{service.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Why Work With Me */}
                <div className="bg-card rounded-2xl p-6 border border-border/50">
                  <h4 className="text-xl font-bold text-foreground mb-4">Why Work With Me?</h4>
                  <div className="space-y-3">
                    {reasonsToWorkTogether.map((reason, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{reason}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Current Availability */}
                <motion.div 
                  className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <h4 className="font-bold text-foreground">Currently Available</h4>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    I'm actively taking on new projects and would love to discuss your requirements. 
                    Let's schedule a call to explore how we can work together to achieve your goals.
                  </p>
                </motion.div>

                {/* FAQ */}
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-foreground">Frequently Asked Questions</h4>
                  <div className="space-y-3">
                    {[
                      {
                        q: "What's your typical project timeline?",
                        a: "Most projects take 2-8 weeks depending on complexity and scope. I'll provide a detailed timeline after understanding your requirements."
                      },
                      {
                        q: "Do you work with international clients?",
                        a: "Absolutely! I work with clients worldwide and am comfortable with different time zones and communication styles."
                      },
                      {
                        q: "What technologies do you specialize in?",
                        a: "I specialize in React, Next.js, Laravel, PHP, and modern web technologies. I choose the best tech stack for each project."
                      },
                      {
                        q: "Do you provide post-launch support?",
                        a: "Yes! I offer ongoing support and maintenance packages to ensure your project continues to perform optimally."
                      }
                    ].map((faq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + index * 0.1 }}
                        className="bg-card rounded-xl p-4 border border-border/50 hover:border-primary-500/30 transition-colors"
                      >
                        <h5 className="font-medium text-foreground mb-2">{faq.q}</h5>
                        <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Call to Action */}
            <motion.div 
              variants={itemVariants}
              className="text-center py-16 bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-primary-500/10 rounded-3xl border border-primary-500/20"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Don't let your great idea stay just an idea. Let's turn it into a reality that exceeds your expectations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="mailto:mohammed.n.jumaa@gmail.com"
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Email Me Directly
                </motion.a>
                <motion.a
                  href="tel:+962787665773"
                  className="btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Schedule a Call
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}