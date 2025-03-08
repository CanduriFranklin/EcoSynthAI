# EcoSynthAI

An AI-powered platform for urban climate optimization and environmental monitoring.

## Overview

EcoSynthAI is a comprehensive environmental monitoring platform that combines real-time data analysis with AI-driven optimization for urban environments. It provides insights into climate conditions, infrastructure status, and environmental sustainability metrics.

## Features

- 🌡️ Real-time climate monitoring
- 🏗️ Infrastructure status tracking
- 🌿 Urban sustainability metrics
- 🌊 Algae monitoring system
- 🔐 Secure authentication system
- 📊 Interactive data visualization

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions and configurations
│   │   ├── pages/        # Page components
│   │   └── App.tsx       # Root component
├── server/                # Backend Express server
│   ├── auth.ts           # Authentication logic
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Data storage interface
│   └── index.ts          # Server entry point
└── shared/               # Shared types and schemas
    └── schema.ts         # TypeScript types and Zod schemas
```

## Technology Stack

- Frontend:
  - React with TypeScript
  - TanStack Query for data fetching
  - Tailwind CSS for styling
  - Shadcn UI components
  - Wouter for routing

- Backend:
  - Express.js
  - Passport.js for authentication
  - In-memory storage (configurable for database)

## Getting Started

1. Clone the repository:
```bash
git clone [your-repo-url]
cd ecosynthai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with:
```
SESSION_SECRET=your_session_secret
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

## Environment Variables
The following environment variables are required:

- `SESSION_SECRET`: Secret key for session management


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.