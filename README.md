# 🔁 Reverse Proxy Logging System

A full-stack TypeScript-based MERN application simulating a **reverse proxy** with request logging and a secure admin dashboard.

## Features

- 🔐 User authentication (signup + login)
- 🌐 Express-based reverse proxy to JSONPlaceholder
- 🗂️ Logs all proxied requests (method, URL, timestamp) to MongoDB
- 📊 Admin dashboard (built with React + Vite + shadcn/ui)
  - View users (from proxy)
  - View logs (from DB)
  - Toggle logging on/off
- Proxy rule management (configurable from frontend)

---

## Monorepo Structure

root/
│
├── backend/ # Express + TypeScript + MongoDB
│ ├── src/
│ └── tsconfig.json
│
├── client/ # Vite + React + shadcn/ui
│ ├── src/
│ └── index.html
│
└── README.md

## Quick Start

Prerequisites
Node.js 18+

MongoDB (Local or Atlas)

Yarn or npm

⚙️ 1. Backend Setup (/backend)
cd backend
Install dependencies:
npm install
Setup environment variables:
Create a .env file:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Start backend in dev mode:
npm run dev
Make sure MongoDB is running.

🎨 2. Frontend Setup (/client)
cd client
Install dependencies:
npm install
Setup environment variables:
Create a .env file:
VITE_API_BASE_URL=http://localhost:5000/api
Start frontend dev server:
npm run dev

## Test the App

Register a new user via the /signup route

Log in using the created credentials

Access the dashboard:

View user data

View proxy logs

Toggle logging on/off

API Overview

Register user
POST /api/auth/signup

Login user 
POST /api/auth/login 

Get users via proxy
GET /api/proxy/users 

Get proxy logs
GET /api/logs Get proxy logs


