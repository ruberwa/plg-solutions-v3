# Landing ReactJS Template

A modern, responsive landing page template built with React, TypeScript, and Tailwind CSS.

## Features

- **Landing sections** - Hero, features, about, and call-to-action blocks
- **Responsive Design** - Works on desktop and mobile devices
- **TypeScript** - Full type safety and better development experience
- **Tailwind CSS** - Custom Amazon-inspired design system
- **React Router** - Client-side routing
- **Production Ready** - Clean, optimized codebase

## Tech Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **pnpm** - Fast, disk space efficient package manager

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd landing-reactjs-template
```

2. Install dependencies
```bash
pnpm install
```

3. Start the development server
```bash
pnpm dev
```

4. Open [http://localhost:4000](http://localhost:4000) in your browser

## Project Structure

```
src/
├── modules/landing/        # Landing page
│   ├── book/              # Page copy and labels
│   └── pages/             # Home page
├── shared/                 # Shared components
│   ├── book/              # Shared text content
│   └── layouts/           # Navbar, Footer, Layout
├── app/                   # Main App component
├── routes/                # React Router configuration
├── index.ts               # Centralized exports
├── index.css              # Tailwind CSS imports
└── main.tsx               # Application entry point
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
