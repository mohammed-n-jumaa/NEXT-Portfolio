'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Link as LinkIcon, Mail, Linkedin, Github } from 'lucide-react';
import toast from 'react-hot-toast';

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

export default function AdminHero() {
  const [heroData, setHeroData] = useState<HeroData>({
    name: '',
    title: '',
    description: '',
    image: '',
    socialLinks: {
      linkedin: '',
      github: '',
      email: ''
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const response = await fetch('/api/portfolio');
      const data = await response.json();
      setHeroData(data.hero);
    } catch (error) {
      toast.error('Failed to load hero data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Get current portfolio data
      const portfolioRes = await fetch('/api/portfolio');
      const portfolioData = await portfolioRes.json();

      // Update hero section
      const updatedData = {
        ...portfolioData,
        hero: heroData
      };

      // Save updated data
      const response = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });

      if (response.ok) {
        toast.success('Hero section updated successfully! 🎉');
      } else {
        throw new Error('Failed to update');
      }
    } catch (error) {
      toast.error('Failed to update hero section');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof HeroData, value: string) => {
    setHeroData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialLinkChange = (platform: keyof HeroData['socialLinks'], value: string) => {
    setHeroData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-foreground mb-2">Hero Section</h1>
        <p className="text-muted-foreground">Update your main profile information and social links</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <motion.div variants={itemVariants}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-card rounded-xl p-6 border border-border/50 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Personal Information</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={heroData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary-500"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Professional Title *
                  </label>
                  <input
                    type="text"
                    value={heroData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary-500"
                    placeholder="e.g., Full Stack Developer"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description *
                  </label>
                  <textarea
                    value={heroData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary-500 resize-none"
                    placeholder="Brief description about yourself and what you do..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Profile Image URL *
                  </label>
                  <input
                    type="url"
                    value={heroData.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary-500"
                    placeholder="https://example.com/your-photo.jpg"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border/50 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <LinkIcon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Social Links</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-blue-600" />
                      LinkedIn Profile
                    </div>
                  </label>
                  <input
                    type="url"
                    value={heroData.socialLinks.linkedin}
                    onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary-500"
                    placeholder="https://linkedin.com/in/your-profile"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4 text-gray-800 dark:text-gray-200" />
                      GitHub Profile
                    </div>
                  </label>
                  <input
                    type="url"
                    value={heroData.socialLinks.github}
                    onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary-500"
                    placeholder="https://github.com/your-username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-red-500" />
                      Email Address
                    </div>
                  </label>
                  <input
                    type="email"
                    value={heroData.socialLinks.email}
                    onChange={(e) => handleSocialLinkChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary-500"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isSaving}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSaving ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span>Saving...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Save className="w-5 h-5" />
                  <span>Save Changes</span>
                </div>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Preview */}
        <motion.div variants={itemVariants}>
          <div className="bg-card rounded-xl p-6 border border-border/50 sticky top-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Live Preview</h2>
            
            <div className="space-y-6">
              {/* Profile Image Preview */}
              {heroData.image && (
                <div className="flex justify-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary-500/20">
                    <img
                      src={heroData.image}
                      alt="Profile preview"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face';
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Text Preview */}
              <div className="text-center space-y-3">
                <h3 className="text-2xl font-bold text-foreground">
                  {heroData.name || 'Your Name'}
                </h3>
                <p className="text-lg text-gradient font-semibold">
                  {heroData.title || 'Your Title'}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {heroData.description || 'Your description will appear here...'}
                </p>
              </div>

              {/* Social Links Preview */}
              <div className="flex justify-center gap-4 pt-4 border-t border-border/50">
                {heroData.socialLinks.linkedin && (
                  <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center">
                    <Linkedin className="w-5 h-5 text-blue-600" />
                  </div>
                )}
                {heroData.socialLinks.github && (
                  <div className="w-10 h-10 bg-gray-600/10 rounded-lg flex items-center justify-center">
                    <Github className="w-5 h-5 text-gray-600" />
                  </div>
                )}
                {heroData.socialLinks.email && (
                  <div className="w-10 h-10 bg-red-600/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-red-600" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}