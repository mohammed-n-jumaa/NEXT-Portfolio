'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, MapPin, Heart, ArrowUp } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/mohammed--nedal',
      color: 'hover:text-blue-500'
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/mohammed-n-jumaa',
      color: 'hover:text-gray-600 dark:hover:text-gray-300'
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:mohammed.n.jumaa@gmail.com',
      color: 'hover:text-red-500'
    }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '/contact' }
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative bg-card border-t border-border/50">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-secondary-500/10 to-primary-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-4 md:grid-cols-2 gap-12"
        >
          {/* Brand & Description */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-3xl font-bold text-gradient mb-4">
                Mohammed Nedal
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                Full Stack Developer passionate about creating innovative web solutions that make a difference. 
                Let's build something amazing together.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary-500" />
                <a 
                  href="mailto:mohammed.n.jumaa@gmail.com"
                  className="hover:text-primary-500 transition-colors"
                >
                  mohammed.n.jumaa@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary-500" />
                <a 
                  href="tel:+962787665773"
                  className="hover:text-primary-500 transition-colors"
                >
                  +962-787665773
                </a>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary-500" />
                <span>Amman, Jordan</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-muted hover:bg-accent rounded-xl flex items-center justify-center text-muted-foreground transition-all duration-300 ${social.color}`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="text-lg font-bold text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('#') ? (
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-muted-foreground hover:text-primary-500 transition-colors duration-200 text-left"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary-500 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="text-lg font-bold text-foreground">Services</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-muted-foreground">Full Stack Development</span>
              </li>
              <li>
                <span className="text-muted-foreground">Web Design & UI/UX</span>
              </li>
              <li>
                <span className="text-muted-foreground">E-commerce Solutions</span>
              </li>
              <li>
                <span className="text-muted-foreground">Consulting & Support</span>
              </li>
            </ul>

            {/* CTA */}
            <motion.div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium transition-colors"
              >
                Let's work together
                <ArrowUp className="w-4 h-4 rotate-45" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="border-t border-border/50 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>© {currentYear} Mohammed Nedal. Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </motion.div>
              <span>in Jordan</span>
            </div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary-500 transition-colors text-sm group"
              whileHover={{ y: -2 }}
            >
              <span>Back to top</span>
              <ArrowUp className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button - Fixed */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}