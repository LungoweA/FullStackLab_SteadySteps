🏃 SteadySteps
📌 System Overview

SteadySteps is a fullstack web application that allows users to track daily physical activity such as steps, stairs climbed, weight, and mood. The app helps users monitor their fitness progress over time and manage personal health goals in a simple structured interface.
Each user can log daily data and set personal fitness goals, enabling long-term tracking of health habits.

⚙️ Tech Stack
Frontend: React (Vite)
Backend: Node.js + Express
Database: MongoDB Atlas
ODM: Mongoose
Dev Tooling: concurrently
🚀 Features
Frontend
Create and display daily logs 
Edit and delete logs
Filter logs by selected user
Backend
Full CRUD API for daily logs and user management
Relational endpoints using MongoDB references (userId)
Custom endpoint: average steps per user
Error handling with HTTP status codes
🗄️ Database Design
Collections
users
dailylogs
goals
Relationships
dailylogs.userId → users._id
goals.userId → users._id

🧪 How to Run Locally
1. Clone repository
git clone https://github.com/LungoweA/FullStackLab_SteadySteps.git
2. Install dependencies
npm install
cd client && npm install
3. Environment variables

Create .env inside /server:

MONGO_URI=your_mongodb_connection_string
PORT=5000
4. Start application

From root folder:
npm run dev

This starts:
React frontend (Vite)
Express backend