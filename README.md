# ClickRush

ClickRush is a fast-paced click challenge app with authentication, game sessions, leaderboard tracking, and player profiles.

## Live Demo

- Live website: [add your deployed URL here]
- Demo notes: [update later]

## Features

- User signup and login
- 60-second click challenge
- Leaderboard and personal progress tracking
- Dashboard and profile pages
- Responsive React UI with animated sections

## Tech Stack

- Frontend: React, Vite, React Router, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, Prisma, PostgreSQL
- Auth: JWT, cookies, bcrypt

## Project Structure

- `frontend/` - Vite client app
- `backend/` - Express API and Prisma schema

## Local Setup

### 1. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2. Configure environment variables

Create a `.env` file in `backend/` with your database and auth settings.

Example:

```env
PORT=5000
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_secret_key
```

Create a `.env` file in `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

## Run the App

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

## API Notes

- The backend exposes routes under `/api/v1`
- The frontend expects the API base URL from `VITE_API_BASE_URL`
- The backend CORS configuration currently allows the local Vite frontend origin; update it if your deployed frontend uses a different domain

## Deployment

For a live demo, deploy the frontend and backend separately, then update `VITE_API_BASE_URL` to point to the hosted API.

Suggested flow:

1. Deploy the backend to Render, Railway, or a similar Node host.
2. Deploy the frontend to Vercel, Netlify, or a similar static host.
3. Set the production API URL in the frontend environment variables.
4. Update the backend CORS origin to match the deployed frontend.

## Future Updates

- Add the final live demo URL
- Add screenshots or a short feature showcase
- Add production deployment notes if the hosting setup changes