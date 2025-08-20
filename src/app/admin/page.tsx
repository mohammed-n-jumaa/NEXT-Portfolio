'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  FolderOpen, 
  Star,
  TrendingUp,
  Eye,
  Calendar,
  Clock
} from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  totalProjects: number;
  totalMessages: number;
  unreadMessages: number;
  totalSkills: number;
  recentMessages: Array<{
    id: string;
    name: string;
    subject: string;
    timestamp: string;
    read: boolean;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalMessages: 0,
    unreadMessages: 0,
    totalSkills: 0,
    recentMessages: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch portfolio data
        const portfolioRes = await fetch('/api/portfolio');
        const portfolioData = await portfolioRes.json();
        
        // Fetch messages
        const messagesRes = await fetch('/api/contact');
        const messagesData = await messagesRes.json();
        
        // Calculate stats
        const totalSkills = [
          ...portfolioData.skills.frontend,
          ...portfolioData.skills.backend,
          ...portfolioData.skills.database,
          ...portfolioData.skills.tools
        ].length;
        
        const unreadMessages = messagesData.filter((msg: any) => !msg.read).length;
        const recentMessages = messagesData.slice(0, 5);
        
        setStats({
          totalProjects: portfolioData.projects.length,
          totalMessages: messagesData.length,
          unreadMessages,
          totalSkills,
          recentMessages
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: FolderOpen,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      trend: '+2 this month'
    },
    {
      title: 'Total Messages',
      value: stats.totalMessages,
      icon: MessageSquare,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      trend: `${stats.unreadMessages} unread`
    },
    {
      title: 'Skills Mastered',
      value: stats.totalSkills,
      icon: Star,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      trend: '4 categories'
    },
    {
      title: 'Site Views',
      value: '2.4k',
      icon: Eye,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      trend: '+15% this week'
    }
  ];

  const quickActions = [
    {
      title: 'Add New Project',
      description: 'Showcase your latest work',
      href: '/admin/projects',
      icon: FolderOpen,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Update Skills',
      description: 'Keep your skills current',
      href: '/admin/skills',
      icon: Star,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Check Messages',
      description: `${stats.unreadMessages} unread messages`,
      href: '/admin/messages',
      icon: MessageSquare,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Edit Hero Section',
      description: 'Update your main profile',
      href: '/admin/hero',
      icon: Users,
      color: 'from-orange-500 to-orange-600'
    }
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
      {/* Welcome Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, Mohammed! 👋
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your portfolio today.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={stat.title}
              variants={itemVariants}
              className="bg-card rounded-xl p-6 border border-border/50 hover:border-primary-500/30 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <IconComponent className={`w-6 h-6 ${stat.color}`} />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-xs text-green-500">{stat.trend}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h2 className="text-xl font-bold text-foreground">Quick Actions</h2>
          <div className="grid gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <motion.div
                  key={action.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <Link
                    href={action.href}
                    className="block bg-card rounded-xl p-4 border border-border/50 hover:border-primary-500/30 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground group-hover:text-primary-500 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Messages */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Recent Messages</h2>
            <Link
              href="/admin/messages"
              className="text-sm text-primary-500 hover:text-primary-600 transition-colors"
            >
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {stats.recentMessages.length > 0 ? (
              stats.recentMessages.map((message, index) => (
                <motion.div
                  key={message.id}
                  variants={itemVariants}
                  className={`bg-card rounded-lg p-4 border transition-colors ${
                    message.read 
                      ? 'border-border/50' 
                      : 'border-primary-500/30 bg-primary-500/5'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-foreground">{message.name}</h4>
                        {!message.read && (
                          <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                        {message.subject}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(message.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground">No messages yet</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity Timeline */}
      <motion.div variants={itemVariants} className="bg-card rounded-xl p-6 border border-border/50">
        <h2 className="text-xl font-bold text-foreground mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[
            {
              action: 'Updated Hero Section',
              time: '2 hours ago',
              icon: Users,
              color: 'text-blue-500'
            },
            {
              action: 'Added new project: E-commerce Platform',
              time: '1 day ago',
              icon: FolderOpen,
              color: 'text-green-500'
            },
            {
              action: 'Received message from Sarah Johnson',
              time: '2 days ago',
              icon: MessageSquare,
              color: 'text-purple-500'
            },
            {
              action: 'Updated skills section',
              time: '3 days ago',
              icon: Star,
              color: 'text-orange-500'
            }
          ].map((activity, index) => {
            const IconComponent = activity.icon;
            return (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-10 h-10 ${activity.color} bg-current/10 rounded-lg flex items-center justify-center`}>
                  <IconComponent className={`w-5 h-5 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Portfolio Performance */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl p-6 border border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Page Views</h3>
              <p className="text-2xl font-bold text-blue-500">2,437</p>
            </div>
          </div>
          <p className="text-sm text-green-500">+15% from last week</p>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Unique Visitors</h3>
              <p className="text-2xl font-bold text-green-500">1,824</p>
            </div>
          </div>
          <p className="text-sm text-green-500">+8% from last week</p>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Contact Rate</h3>
              <p className="text-2xl font-bold text-purple-500">3.2%</p>
            </div>
          </div>
          <p className="text-sm text-green-500">+0.5% from last week</p>
        </div>
      </motion.div>
    </motion.div>
  );
}