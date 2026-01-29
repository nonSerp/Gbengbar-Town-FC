# Gbengbar Town FC Website

Official website for Gbengbar Town FC - Built with Astro 5.1

## 🚀 Features

- Modern, responsive design with club branding (green and gold colors)
- Static site generation for optimal performance
- Mobile-friendly navigation
- Animated hero section
- Latest news section
- Club statistics showcase
- SEO optimized

## 📋 Prerequisites

- Node.js 18.17.0 or higher
- npm or yarn package manager

## 🛠️ Installation

1. Navigate to the project directory:
```bash
cd gbengbar-town-fc
```

2. Install dependencies:
```bash
npm install
```

## 🏃 Development

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:4321`

## 🔨 Build

Build the site for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
/
├── public/
│   └── logo.png          # Club logo
├── src/
│   ├── components/
│   │   ├── Header.astro  # Navigation header
│   │   └── Footer.astro  # Footer with links
│   ├── layouts/
│   │   └── Layout.astro  # Base layout template
│   └── pages/
│       └── index.astro   # Homepage
├── astro.config.mjs      # Astro configuration
├── package.json
└── tsconfig.json
```

## 🎨 Customization

### Colors
The club colors are defined in CSS variables in `src/layouts/Layout.astro`:
- `--club-green: #1a4d2e`
- `--club-gold: #f4b53f`
- `--club-dark: #0a1f14`
- `--club-light: #f5f5f5`

### Content
Edit the homepage content in `src/pages/index.astro`

### Navigation
Update navigation links in `src/components/Header.astro`

## 📄 Additional Pages

To add more pages, create new `.astro` files in `src/pages/`:
- `team.astro` - Team roster and profiles
- `fixtures.astro` - Match schedule and results
- `news.astro` - News articles and updates
- `contact.astro` - Contact information and form

## 🌐 Deployment

This site can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages
- Any static hosting service

## 📚 Learn More

- [Astro Documentation](https://docs.astro.build)
- [Astro Discord](https://astro.build/chat)

## 📝 License

© 2026 Gbengbar Town FC. All rights reserved.

---

**Est. August 2023** - Pride of the Community
