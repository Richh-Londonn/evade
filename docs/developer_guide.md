
# Developer Guide

## Setting Up the Project
1. Clone the repository: `git clone <repository_url>`
2. Navigate to the project directory: `cd evade`
3. Install dependencies:
   - Backend: `cd backend && npm install`
   - Frontend: `cd frontend && npm install`
   - Mobile: `cd mobile && npm install`
4. Set up environment variables:
   - Copy `.env.example` to `.env` in each subdirectory and update values.

## Directory Structure
- **backend/**: Node.js backend with Express APIs and WebSocket server.
- **frontend/**: React-based web application.
- **mobile/**: React Native mobile app.
- **offline/**: Scripts for offline navigation and caching.
- **ml/**: AI/ML scripts for hazard detection.
- **hardware/**: OBD-II and RF signal integration.
- **ar/**: AR navigation scripts.
- **docs/**: Documentation files.

## Running Locally
- Backend: `cd backend && npm start`
- Frontend: `cd frontend && npm start`
- Mobile: Use `expo start` in the `mobile/` directory.

