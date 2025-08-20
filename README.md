# 🚀 Mohammed Nedal Portfolio

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS featuring a complete admin panel for content management.

## ✨ Features

### 🎨 Frontend
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode**: Theme switching with system preference detection
- **Smooth Animations**: Framer Motion powered animations throughout
- **Modern UI**: Clean, professional design with gradient accents
- **Interactive Sections**:
  - Animated hero section with frame drawing effect
  - Masonry layout projects grid
  - Interactive skills word cloud
  - 3D rotating services cube
  - Timeline-based experience section
  - Speech bubble testimonials
  - Contact form with validation

### 🔧 Admin Panel
- **Secure Access**: Password-protected admin panel
- **Content Management**: Edit all sections through intuitive forms
- **Message Center**: View and manage contact form submissions
- **Live Preview**: See changes before saving
- **Media Management**: Easy image URL management
- **Responsive**: Admin panel works on all devices

### 🛠 Technical Features
- **Next.js 14**: Latest App Router with TypeScript
- **JSON Storage**: File-based data storage (no database required)
- **API Routes**: RESTful API for data management
- **SEO Optimized**: Meta tags and structured data
- **Performance**: Optimized images and lazy loading
- **Accessibility**: WCAG compliant components

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git (for deployment)

### Installation

```bash
# 1. Create Next.js project
npx create-next-app@latest mohammed-portfolio --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# 2. Navigate to project
cd mohammed-portfolio

# 3. Install dependencies
npm install framer-motion react-hot-toast lucide-react react-use-gesture three @types/three next-themes

# 4. Replace/create files with provided code
# Copy all the component files, pages, and configurations

# 5. Start development server
npm run dev
```

### File Structure
```
mohammed-portfolio/
├── src/
│   ├── app/
│   │   ├── admin/          # Admin panel pages
│   │   ├── api/            # API routes
│   │   ├── contact/        # Contact page
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   └── data/              # JSON data files
├── public/                # Static assets
├── tailwind.config.js     # Tailwind configuration
└── package.json          # Dependencies
```

## 🎯 Configuration

### Admin Access
- Default admin code: `ADMIN2024`
- Change in `src/components/AdminModal.tsx`
- Access: Click profile image → Enter code

### Customization
1. **Colors**: Edit `tailwind.config.js`
2. **Content**: Use admin panel or edit `src/data/portfolio.json`
3. **Styling**: Modify `src/app/globals.css`

### Data Structure
- **Portfolio Data**: `src/data/portfolio.json`
- **Messages**: `src/data/messages.json` (auto-created)

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 0-640px
- **Tablet**: 641-1024px
- **Desktop**: 1025px+

### Features
- Collapsible navigation
- Stacked layouts on mobile
- Touch-friendly interactions
- Optimized typography scaling

## 🌙 Dark Mode

Automatic theme detection with manual toggle:
- System preference detection
- Persistent theme storage
- Smooth transitions
- All components themed

## 📊 Admin Panel Sections

### 1. Dashboard
- Overview statistics
- Recent messages
- Quick actions
- Activity timeline

### 2. Hero Section
- Personal information
- Profile image
- Social links
- Live preview

### 3. Projects
- Add/edit projects
- Image management
- Technology tags
- Category organization

### 4. Skills
- Skill categories
- Proficiency levels
- Interactive management

### 5. Services
- Service descriptions
- Feature lists
- Icon selection

### 6. Experience
- Work history
- Responsibilities
- Timeline management

### 7. Testimonials
- Client testimonials
- Ratings
- Photo management

### 8. Messages
- Contact form submissions
- Read/unread status
- Response management

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts for configuration
```

### Manual GitHub + Vercel
1. Push code to GitHub
2. Connect repository in Vercel dashboard
3. Deploy automatically

### Build for Production
```bash
# Build
npm run build

# Start production server
npm start
```

## 🛠 Development

### Available Scripts
```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # Code linting
```

### Key Dependencies
- **Next.js 14**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Framer Motion**: Animations
- **React Hot Toast**: Notifications
- **Lucide React**: Icons
- **Next Themes**: Theme management

## 🎨 Customization Guide

### Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#9b5de5',  // Main purple
    // ... other shades
  },
  secondary: {
    500: '#3a0ca3',  // Blue accent
    // ... other shades
  }
}
```

### Animations
Located in `src/app/globals.css`:
- Custom keyframes
- Utility classes
- Component-specific styles

### Content
Use admin panel or edit JSON files:
- `src/data/portfolio.json` - Main content
- `src/data/messages.json` - Contact messages

## 🔧 API Endpoints

### Portfolio Data
- `GET /api/portfolio` - Get portfolio data
- `PUT /api/portfolio` - Update portfolio data

### Contact Messages
- `GET /api/contact` - Get messages
- `POST /api/contact` - Send message
- `PATCH /api/contact` - Update message status

## 📈 Performance

### Optimizations
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Unused code removal
- **Compression**: Automatic asset compression

### Best Practices
- Lazy loading
- Efficient animations
- Minimal JavaScript bundles
- Optimized CSS delivery

## 🧪 Testing

### Manual Testing
- Test all interactive elements
- Verify responsive design
- Check dark/light mode
- Test admin functionality

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚨 Troubleshooting

### Common Issues

**Build Errors**:
- Check TypeScript types
- Verify all imports
- Ensure data files exist

**Styling Issues**:
- Check Tailwind classes
- Verify CSS imports
- Test dark mode styles

**Admin Access**:
- Verify admin code
- Check localStorage
- Clear browser cache

## 📞 Support

For questions or issues:
1. Check this README
2. Review component code
3. Test in development mode
4. Check browser console

## 📝 License

This project is open source and available under the MIT License.

---

**Built with ❤️ by Mohammed Nedal**

*A modern portfolio solution for developers*