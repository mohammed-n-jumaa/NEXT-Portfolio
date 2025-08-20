'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Monitor, Database, Settings } from 'lucide-react';

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
  { key: 'frontend' as SkillCategory, label: 'Frontend', icon: Monitor, color: 'from-blue-500 to-cyan-500' },
  { key: 'backend' as SkillCategory, label: 'Backend', icon: Code, color: 'from-green-500 to-emerald-500' },
  { key: 'database' as SkillCategory, label: 'Database', icon: Database, color: 'from-purple-500 to-violet-500' },
  { key: 'tools' as SkillCategory, label: 'Tools', icon: Settings, color: 'from-orange-500 to-red-500' }
];

export default function SkillsSection() {
  const [skillsData, setSkillsData] = useState<SkillsData>({
    frontend: [],
    backend: [],
    database: [],
    tools: []
  });
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('frontend');

  useEffect(() => {
    // Load skills data
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        if (data.skills) {
          setSkillsData(data.skills);
        }
      })
      .catch(() => {
        // Fallback data
        setSkillsData({
          frontend: [
            { name: "HTML5", level: 90 },
            { name: "CSS3", level: 90 },
            { name: "JavaScript", level: 85 },
            { name: "React.js", level: 85 },
            { name: "Bootstrap", level: 80 },
            { name: "Tailwind CSS", level: 75 }
          ],
          backend: [
            { name: "PHP", level: 85 },
            { name: "Laravel", level: 85 },
            { name: "Node.js", level: 70 },
            { name: "RESTful APIs", level: 80 }
          ],
          database: [
            { name: "MySQL", level: 80 },
            { name: "Database Design", level: 75 }
          ],
          tools: [
            { name: "Git/GitHub", level: 85 },
            { name: "Visual Studio Code", level: 90 },
            { name: "Figma", level: 70 },
            { name: "Postman", level: 75 }
          ]
        });
      });
  }, []);

  // Get all skills for overview
  const allSkills = [
    ...skillsData.frontend,
    ...skillsData.backend,
    ...skillsData.database,
    ...skillsData.tools
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div 
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Technical <span className="text-gradient">Skills</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A comprehensive overview of my technical expertise across various technologies
            </p>
          </motion.div>

          {/* Skills Overview Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryInfo.map((category, index) => {
              const IconComponent = category.icon;
              const categorySkills = skillsData[category.key];
              const avgLevel = categorySkills.length > 0 
                ? Math.round(categorySkills.reduce((acc, skill) => acc + skill.level, 0) / categorySkills.length)
                : 0;

              return (
                <motion.div
                  key={category.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveCategory(category.key)}
                  className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 ${
                    activeCategory === category.key
                      ? 'border-purple-500 bg-white dark:bg-gray-800 shadow-xl'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{avgLevel}%</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{category.label}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{categorySkills.length} skills</p>
                </motion.div>
              );
            })}
          </div>

          {/* Detailed Skills View */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Category Tabs */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Skill Categories</h3>
                <div className="space-y-3">
                  {categoryInfo.map((category) => {
                    const IconComponent = category.icon;
                    const isActive = activeCategory === category.key;
                    
                    return (
                      <motion.button
                        key={category.key}
                        onClick={() => setActiveCategory(category.key)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                            : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isActive ? 'bg-white/20' : `bg-gradient-to-r ${category.color}`
                        }`}>
                          <IconComponent className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white'}`} />
                        </div>
                        <div className="text-left">
                          <h4 className="font-semibold">{category.label}</h4>
                          <p className="text-sm opacity-80">{skillsData[category.key].length} skills</p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {categoryInfo.find(c => c.key === activeCategory)?.label} Skills
                </h3>
                
                <motion.div 
                  key={activeCategory}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  {skillsData[activeCategory].map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
                      </div>
                      
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${categoryInfo.find(c => c.key === activeCategory)?.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ 
                            duration: 1,
                            delay: index * 0.1,
                            ease: "easeOut"
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-2xl p-8 text-white"
          >
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{allSkills.length}+</div>
              <div className="text-sm opacity-80">Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">
                {allSkills.length > 0 ? Math.round(allSkills.reduce((acc, skill) => acc + skill.level, 0) / allSkills.length) : 0}%
              </div>
              <div className="text-sm opacity-80">Avg. Proficiency</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">4</div>
              <div className="text-sm opacity-80">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">1+</div>
              <div className="text-sm opacity-80">Years Experience</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}