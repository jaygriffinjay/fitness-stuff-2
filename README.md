# Fitness Run Tracker

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)](https://styled-components.com/)
[![Recharts](https://img.shields.io/badge/Recharts-22C55E?style=for-the-badge&logo=react&logoColor=white)](https://recharts.org/)

A modern fitness tracking application built with React and TypeScript. This dashboard displays running analytics with interactive charts for pace and heart rate data, along with recent run history.

## What's Implemented

- **StatsOverview Component** - Interactive area charts showing pace (min/km) and heart rate (bpm) over time with dual y-axes
- **Segment Selection** - Click and drag functionality to analyze specific portions of runs with calculated averages
- **RecentRuns Component** - List view of recent running sessions with distance, pace, time, and placeholder for route maps
- **Header Component** - Simple branded header with gradient styling
- **Mock Data Integration** - Sample running data (40-minute run with pace/HR variations) for development and demo

## Features

- 📊 Interactive run analysis with pace and heart rate visualization
- 🎯 Segment analysis for detailed performance insights
- 📱 Responsive design for all devices
- 📈 Real-time statistics overview
- 🗺️ Recent runs history with route maps

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Styling**: Styled Components for component-based CSS
- **Charts**: Recharts for interactive data visualization
- **Build Tool**: Vite for lightning-fast development
- **Icons**: Heroicons for consistent UI elements

## Current State

Currently uses mock/sample data for a 40-minute run showing:
- Walking phase (12.0 min/km pace, 90-95 bpm)
- Running segments (6.5-8.0 min/km pace, 135-185 bpm)
- Various pace and heart rate transitions throughout the workout

Perfect for development, testing chart interactions, and demonstrating the dashboard capabilities.

## Getting Started

```bash
npm install
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build