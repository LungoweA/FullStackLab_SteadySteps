# SteadySteps👣

## 📌Description
SteadySteps is a fullstack web application for tracking daily physical activity, including steps, stairs, weight, and mood, to help users monitor progress and stay motivated over time.
The goal of the app is to give users a simple and consistent way to log daily movement data and track long-term health habits.

---

## ⚙️Tech Stack
- React (Vite)
- Express.js
- MongoDB Atlas
- Mongoose
- Node.js

---

## 🚀Features

### Frontend
- Display daily logs in a structured table
- Create new logs using controlled forms
- Edit and delete logs (inline editing)
- Filter logs by selected user
- Auto-refresh data every 10 seconds
- Loading and error states

### Backend
- Full CRUD API for daily logs
- User management
- Goal management (one goal per user using upsert logic)
- Relational data using MongoDB references
- Custom endpoint for user statistics (average steps per user)
- Consistent error handling with HTTP status codes

---

## 🗄️Database Structure

### Collections
- users
- dailylogs
- goals

---

## 🧪Setup Instructions

### Install dependencies
```bash
npm install
cd client && npm install