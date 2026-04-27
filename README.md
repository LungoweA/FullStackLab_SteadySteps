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

- Create users and assign daily activity logs
- Track steps, stairs, weight, and mood
- Update and delete logs with confirmation
- View user-specific logs
- Display goals per user
- Show average step statistics per user

---

## 🧪Setup Instructions

### Clone repository

git clone https://github.com/LungoweA/FullStackLab_SteadySteps.git
cd SteadySteps

### Backend Setup

cd server  
npm install  

Create a `.env` file inside `/server`:
MONGO_URI=mongodb_connection_string  
PORT=5000  

Run backend:
npm run dev  

---

### Frontend Setup
cd client  
npm install  
npm run dev  

---

### Run both
npm run dev
(run from root folder while using concurrently)

---

## Seed Data
To populate the database:

node seed.js  

This creates:
- 5 realistic users
- sample daily logs
- goals per user  

---
