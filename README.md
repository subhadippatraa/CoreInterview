# CoreInterview

CoreInterview is a professional, distraction-free interview preparation platform built specifically for .NET developers. Designed with a premium "Hello Interview" aesthetic, it provides high-quality technical questions, answers, architecture diagrams, and follow-up discussions to help you ace your next interview.

## Features

- 🎯 **Focused Learning**: Distraction-free, minimal UI for deep reading and focus.
- 🌙 **Modern Dark Mode**: Sleek, eye-friendly design optimized for prolonged study sessions.
- ⚡ **Frontend-Only Architecture**: Fully client-side application built with React, ensuring lightning-fast navigation with no backend dependencies or latency.
- ⌨️ **Keyboard Navigation**: Use keyboard shortcuts (Space, Arrow keys, B) to reveal answers, navigate through questions, and bookmark important topics seamlessly.
- 📊 **Progress Tracking**: Track your study progress by marking questions as reviewed and bookmarking ones you want to revisit.
- 📱 **Responsive Design**: Beautifully responsive interface that works perfectly across desktop, tablet, and mobile devices.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM (HashRouter for GitHub Pages compatibility)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Heroicons & Lucide React

## Getting Started

### Prerequisites

Ensure you have Node.js (v18+) installed on your local machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/subhadippatraa/CoreInterview.git
   cd CoreInterview
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Architecture Notes

CoreInterview is explicitly designed as a frontend-only static site to avoid backend infrastructure costs while scaling to support up to 500+ interview questions. All content is stored in local JSON data structures, and state (progress, bookmarks) is maintained locally using client-side storage mechanisms.

## Deployment

This application is configured for deployment to GitHub Pages using GitHub Actions. It uses `HashRouter` to ensure client-side routing works flawlessly on static file hosting without relying on server-side URL rewrites.
