'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Home, 
  FolderOpen, 
  Code, 
  Briefcase, 
  Star, 
  MessageSquare, 
  User, 
  Settings,
  Menu,
  X,
  LogOut,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

const sidebarItems = [
  { 
    name: 'Dashboard', 
    href: '/admin', 
    icon: Home,
    exact: true
  },
  { 
    name: 'Hero Section', 
    href: '/admin/hero', 
    icon: User 
  },
  { 
    name: 'Projects', 
    href: '/admin/projects', 
    icon: FolderOpen 
  },
  { 
    name: 'Skills', 
    href: '/admin/skills', 
    icon: Code 
  },
  { 
    name: 'Services', 
    href: '/admin/services', 
    icon: Briefcase 
  },
  { 
    name: 'Experience', 
    href: '/admin/experience', 
    icon: Star 
  },
  { 
    name: 'Testimonials', 
    href: '/admin/testimonials', 
    icon: MessageSquare 
  },
  { 
    name: 'Messages', 
    href: '/admin/messages', 
    icon: MessageSquare 
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check authentication
    const authStatus = localStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    } else {
      router.push('/');
      toast.error('Admin access required');
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    toast.success('Logged out successfully');
    router.push('/');
  };

  const isActiveLink = (href: string, exact: boolean = false) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'rgb(var(--background))' }}>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'rgb(var(--background))' }}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={`fixed lg:relative lg:translate-x-0 inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: 'rgb(var(--card))', borderColor: 'rgb(var(--border))' }}
      >
        <div className="flex flex-col h-full border-r">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'rgb(var(--border))' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gradient">Admin Panel</h2>
                <p className="text-xs" style={{ color: 'rgb(var(--muted-foreground))' }}>Portfolio Manager</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-accent rounded-lg transition-colors"
              style={{ color: 'rgb(var(--muted-foreground))' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wider px-3 mb-2" style={{ color: 'rgb(var(--muted-foreground))' }}>
                Main
              </p>
            </div>
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = isActiveLink(item.href, item.exact);
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg transform scale-[1.02]'
                      : 'hover:bg-accent'
                  }`}
                  style={{ 
                    color: isActive ? 'white' : 'rgb(var(--muted-foreground))',
                  }}
                >
                  <IconComponent 
                    size={20} 
                    className={`${isActive ? 'text-white' : 'group-hover:text-purple-500'} transition-colors`}
                  />
                  <span className={`font-medium ${isActive ? 'text-white' : 'group-hover:text-foreground'} transition-colors`}>
                    {item.name}
                  </span>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 text-white ml-auto" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t" style={{ borderColor: 'rgb(var(--border))' }}>
            <div className="flex items-center gap-3 mb-3 p-3 rounded-lg" style={{ backgroundColor: 'rgb(var(--muted))' }}>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">MN</span>
              </div>
              <div>
                <p className="font-medium" style={{ color: 'rgb(var(--foreground))' }}>Mohammed Nedal</p>
                <p className="text-xs" style={{ color: 'rgb(var(--muted-foreground))' }}>Administrator</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 w-full text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-30 border-b backdrop-blur-sm" 
                style={{ 
                  backgroundColor: 'rgba(var(--card), 0.8)', 
                  borderColor: 'rgb(var(--border))' 
                }}>
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-accent rounded-lg transition-colors"
                style={{ color: 'rgb(var(--foreground))' }}
              >
                <Menu size={20} />
              </button>
              <div>
                <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--foreground))' }}>
                  Portfolio Admin
                </h1>
                <p className="text-sm" style={{ color: 'rgb(var(--muted-foreground))' }}>
                  Manage your portfolio content
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                target="_blank"
                className="px-4 py-2 text-sm bg-accent hover:bg-muted rounded-lg transition-colors"
                style={{ color: 'rgb(var(--foreground))' }}
              >
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}