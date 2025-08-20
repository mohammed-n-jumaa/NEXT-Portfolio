import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono'
});

export const metadata: Metadata = {
  title: 'Mohammed Nedal - Full Stack Developer',
  description: 'Full Stack Developer passionate about creating dynamic, user-friendly web applications using React.js, PHP, Laravel, MySQL, and modern front-end technologies.',
  keywords: 'Full Stack Developer, React.js, PHP, Laravel, MySQL, Web Development, Jordan',
  authors: [{ name: 'Mohammed Nedal' }],
  creator: 'Mohammed Nedal',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'Mohammed Nedal - Full Stack Developer',
    description: 'Full Stack Developer passionate about creating dynamic, user-friendly web applications',
    url: 'http://localhost:3000',
    siteName: 'Mohammed Nedal Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammed Nedal - Full Stack Developer',
    description: 'Full Stack Developer passionate about creating dynamic, user-friendly web applications',
  },
  robots: 'index, follow',
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              darkMode: 'class',
              theme: {
                extend: {
                  colors: {
                    primary: {
                      50: '#f3f0ff',
                      100: '#ede9fe', 
                      200: '#ddd6fe',
                      300: '#c4b5fd',
                      400: '#a78bfa',
                      500: '#9b5de5',
                      600: '#7c3aed',
                      700: '#6d28d9',
                      800: '#5b21b6',
                      900: '#4c1d95',
                    },
                    secondary: {
                      50: '#e0e7ff',
                      100: '#c7d2fe',
                      200: '#a5b4fc', 
                      300: '#818cf8',
                      400: '#6366f1',
                      500: '#3a0ca3',
                      600: '#4338ca',
                      700: '#3730a3',
                      800: '#312e81',
                      900: '#1e1b4b',
                    }
                  },
                  animation: {
                    'gradient': 'gradient 6s ease infinite',
                    'float': 'float 6s ease-in-out infinite',
                    'pulse-slow': 'pulse 3s ease-in-out infinite',
                  },
                  keyframes: {
                    gradient: {
                      '0%, 100%': { backgroundPosition: '0% 50%' },
                      '50%': { backgroundPosition: '100% 50%' },
                    },
                    float: {
                      '0%, 100%': { transform: 'translateY(0px)' },
                      '50%': { transform: 'translateY(-20px)' },
                    }
                  }
                }
              }
            }
          `
        }} />
        <style dangerouslySetInnerHTML={{
          __html: `
            .text-gradient {
              background: linear-gradient(135deg, #9b5de5, #3a0ca3);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
            
            .btn-primary {
              background: linear-gradient(135deg, #9b5de5, #3a0ca3);
              color: white;
              font-weight: 500;
              padding: 12px 24px;
              border-radius: 8px;
              transition: all 0.3s;
              border: none;
              cursor: pointer;
              display: inline-flex;
              align-items: center;
              justify-content: center;
            }
            
            .btn-primary:hover {
              transform: scale(1.05);
              box-shadow: 0 10px 25px rgba(155, 93, 229, 0.25);
            }
            
            .btn-secondary {
              background: transparent;
              border: 2px solid #9b5de5;
              color: #9b5de5;
              font-weight: 500;
              padding: 12px 24px;
              border-radius: 8px;
              transition: all 0.3s;
              cursor: pointer;
              display: inline-flex;
              align-items: center;
              justify-content: center;
            }
            
            .btn-secondary:hover {
              background: #9b5de5;
              color: white;
              transform: scale(1.05);
            }
            
            .loading-dots {
              display: inline-flex;
              gap: 4px;
            }
            
            .loading-dots span {
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: #9b5de5;
              animation: loading-dot 1.4s ease-in-out infinite both;
            }
            
            .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
            .loading-dots span:nth-child(2) { animation-delay: -0.16s; }
            
            @keyframes loading-dot {
              0%, 80%, 100% {
                transform: scale(0);
                opacity: 0.5;
              }
              40% {
                transform: scale(1);
                opacity: 1;
              }
            }
            
            @media (max-width: 767px) {
              .text-responsive-xl { font-size: 2rem !important; }
              .text-responsive-lg { font-size: 1.5rem !important; }
              .text-responsive-base { font-size: 1rem !important; }
            }
            
            @media (min-width: 768px) {
              .text-responsive-xl { font-size: 3rem !important; }
              .text-responsive-lg { font-size: 2rem !important; }
              .text-responsive-base { font-size: 1.125rem !important; }
            }
            
            @media (min-width: 1024px) {
              .text-responsive-xl { font-size: 4rem !important; }
              .text-responsive-lg { font-size: 2.5rem !important; }
              .text-responsive-base { font-size: 1.25rem !important; }
            }
          `
        }} />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#f1f5f9',
                border: '1px solid #334155',
              },
              success: {
                iconTheme: {
                  primary: '#9b5de5',
                  secondary: '#ffffff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#ffffff',
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}