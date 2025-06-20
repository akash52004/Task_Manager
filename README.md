# Task Manager

A full-stack Task Manager application built with React (frontend) and Node.js/Express/MongoDB (backend).

## Features
- User registration and login (JWT authentication)
- Create, update, delete, and list tasks
- Mark tasks as completed/incomplete
- Responsive dashboard
- Protected routes (only authenticated users can access dashboard)

## Project Structure
```
task-manager/
  backend/         # Node.js/Express/MongoDB backend
    config/        # Database config
    middleware/    # Auth middleware
    models/        # Mongoose models (User, Task)
    routes/        # API routes (auth, tasks)
    server.js      # Entry point
    package.json   # Backend dependencies
  frontend/        # React frontend
    public/        # Static files (index.html)
    src/           # React source code
      components/  # React components (Dashboard, Login, Register, etc.)
      context/     # Auth context
      utils/       # API utilities
      App.js       # Main app and routing
      index.js     # Entry point
    package.json   # Frontend dependencies
README.md          # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm
- MongoDB (local or Atlas)

### Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the backend folder and add your MongoDB URI:
   ```env
   MONGO_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start MongoDB (if running locally):
   - On Windows: `net start MongoDB`
   - Or run `mongod` in a separate terminal
5. Start the backend server:
   ```sh
   npm run dev
   ```
   The backend will run on [http://localhost:5000](http://localhost:5000)

### Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm start
   ```
   The frontend will run on [http://localhost:3000](http://localhost:3000)

## Usage
- Register a new account or log in with existing credentials.
- Add, edit, complete, or delete your tasks from the dashboard.
- Log out when finished.

## Notes
- Make sure the backend is running before starting the frontend.
- The frontend expects the backend API to be available at `http://localhost:5000` (change in `frontend/src/utils/api.js` if needed).
- For production, set up environment variables and use secure secrets.


