'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Code, Database, Monitor, Settings } from 'lucide-react';
import toast from 'react-hot-toast';

interface Skill {
  name: string;
  level: number;
}

interface SkillsData {
  frontend: Skill[];
  backend: Skill[];
  database: Skill[];
  tools: Skill[];
}

type SkillCategory = keyof SkillsData;

const categoryInfo = [
  { key: 'frontend' as SkillCategory, label: 'Frontend', icon: Monitor, color: 'from-blue-500 to-blue-600' },
  { key: 'backend' as SkillCategory, label: 'Backend', icon: Code, color: 'from-green-500 to-green-600' },
  { key: 'database' as SkillCategory, label: 'Database', icon: Database, color: 'from-purple-500 to-purple-600' },
  { key: 'tools' as SkillCategory, label: 'Tools', icon: Settings, color: 'from-orange-500 to-orange-600' }
];

export default function AdminSkills() {
  const [skillsData, setSkillsData] = useState<SkillsData>({
    frontend: [],
    backend: [],
    database: [],
    tools: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState<{ skill: Skill; category: SkillCategory; index: number } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('frontend');
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    level: 50
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/portfolio');
      const data = await response.json();
      setSkillsData(data.skills);
    } catch (error) {
      toast.error('Failed to load skills');
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (category: SkillCategory, skill?: Skill, index?: number) => {
    setSelectedCategory(category);
    if (skill && typeof index === 'number') {
      setEditingSkill({ skill, category, index });
      setFormData({
        name: skill.name,
        level: skill.level
      });
    } else {
      setEditingSkill(null);
      setFormData({
        name: '',
        level: 50
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSkill(null);
    setFormData({ name: '', level: 50 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const portfolioRes = await fetch('/api/portfolio');
      const portfolioData = await portfolioRes.json();

      let updatedSkills = { ...portfolioData.skills };

      if (editingSkill) {
        // Update existing skill
        updatedSkills[editingSkill.category][editingSkill.index] = formData;
      } else {
        // Add new skill
        updatedSkills[selectedCategory].push(formData);
      }

      const updatedData = {
        ...portfolioData,
        skills: updatedSkills
      };

      const response = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });

      if (response.ok) {
        setSkillsData(updatedSkills);
        closeModal();
        toast.success(editingSkill ? 'Skill updated successfully! 🎉' : 'Skill added successfully! 🎉');
      } else {
        throw new Error('Failed to save skill');
      }
    } catch (error) {
      toast.error('Failed to save skill');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteSkill = async (category: SkillCategory, index: number) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      const portfolioRes = await fetch('/api/portfolio');
      const portfolioData = await portfolioRes.json();

      const updatedSkills = { ...portfolioData.skills };
      updatedSkills[category].splice(index, 1);

      const updatedData = {
        ...portfolioData,
        skills: updatedSkills
      };

      const response = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });

      if (response.ok) {
        setSkillsData(updatedSkills);
        toast.success('Skill deleted successfully');
      } else {
        throw new Error('Failed to delete skill');
      }
    } catch (error) {
      toast.error('Failed to delete skill');
    }
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
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Skills Management</h1>
          <p className="text-muted-foreground">Manage your technical skills and proficiency levels</p>
        </div>
      </motion.div>

      {/* Skills by Category */}
      <div className="grid gap-8">
        {categoryInfo.map((category) => {
          const IconComponent = category.icon;
          const skills = skillsData[category.key];
          
          return (
            <motion.div key={category.key} variants={itemVariants} className="bg-card rounded-xl p-6 border border-border/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{category.label}</h2>
                    <p className="text-sm text-muted-foreground">{skills.length} skills</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => openModal(category.key)}
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </motion.button>
              </div>

              {skills.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={`${skill.name}-${index}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-background rounded-lg p-4 border border-border/50 hover:border-primary-500/30 transition-colors group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-foreground">{skill.name}</h3>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openModal(category.key, skill, index)}
                            className="p-1 hover:bg-accent rounded transition-colors"
                          >
                            <Edit className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button
                            onClick={() => deleteSkill(category.key, index)}
                            className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Proficiency</span>
                          <span className="font-medium text-foreground">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
                  <IconComponent className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                  <h3 className="font-medium text-foreground mb-1">No {category.label.toLowerCase()} skills yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">Start by adding your first {category.label.toLowerCase()} skill</p>
                  <button
                    onClick={() => openModal(category.key)}
                    className="btn-secondary"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add {category.label} Skill
                  </button>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />

            <motion.div
              className="relative bg-card rounded-2xl p-6 w-full max-w-md border border-border/50 shadow-xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">
                  {editingSkill ? 'Edit Skill' : `Add ${categoryInfo.find(c => c.key === selectedCategory)?.label} Skill`}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Skill Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary-500"
                    placeholder="e.g., React.js, Node.js, MySQL"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Proficiency Level: {formData.level}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.level}
                    onChange={(e) => setFormData(prev => ({ ...prev, level: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Beginner</span>
                    <span>Intermediate</span>
                    <span>Advanced</span>
                    <span>Expert</span>
                  </div>
                </div>

                {/* Preview */}
                <div className="bg-muted/20 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-foreground mb-3">Preview</h4>
                  <div className="bg-background rounded-lg p-3 border border-border/50">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-foreground">{formData.name || 'Skill Name'}</span>
                      <span className="text-sm text-muted-foreground">{formData.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-300"
                        style={{ width: `${formData.level}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-6 py-3 border border-border rounded-lg text-foreground hover:bg-accent transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
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
                        <Save className="w-4 h-4" />
                        <span>{editingSkill ? 'Update' : 'Add'} Skill</span>
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}