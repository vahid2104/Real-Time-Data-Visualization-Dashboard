# 📊 Real-Time Data Visualization Dashboard

A full-stack real-time dashboard application that visualizes live system metrics, user activity, and alerts using WebSockets.  
Built as part of an academic project with a focus on performance, scalability, and real-time data streaming.

---

## 🚀 Features

### Frontend
- Real-time line and bar charts
- Live KPI cards (users, response time, revenue)
- Live connection status (Online / Offline)
- Alerts panel with real-time updates
- Activity timeline
- Responsive UI (desktop & tablet)
- Built with React + TypeScript + Tailwind CSS

### Backend
- REST API with Express
- Real-time data streaming via Socket.IO
- MongoDB for alert persistence
- Simulated live metrics & alerts
- WebSocket connection handling
- CORS & environment-based configuration

---

## 🧠 Tech Stack

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- Recharts
- Socket.IO Client
- Lucide Icons

### Backend
- Node.js
- Express
- Socket.IO
- MongoDB + Mongoose
- dotenv
- Nodemon

---

## 📁 Project Structure

Real-Time-Data-Visualization-Dashboard/
├─ frontend/
│ ├─ src/
│ ├─ package.json
│ └─ ...
├─ backend/
│ ├─ src/
│ │ ├─ routes/
│ │ ├─ socket/
│ │ ├─ models/
│ │ └─ services/
│ ├─ package.json
│ └─ ...
└─ README.md


---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
CLIENT_ORIGIN=http://localhost:3000
Frontend (frontend/.env)
env
Copy code
VITE_API_URL=http://localhost:4000
⚠️ .env files are intentionally excluded from GitHub.

▶️ How to Run Locally
1️⃣ Backend
bash
Copy code
cd backend
npm install
npm run dev
Backend will start at:



http://localhost:4000
2️⃣ Frontend

cd frontend
npm install
npm run dev
Frontend will start at:


http://localhost:3000
🔴 Real-Time Behavior
When backend is running → dashboard shows LIVE status

When backend stops → charts freeze and connection switches to OFFLINE

When backend restarts → data streaming resumes automatically

📌 Key Challenges Solved
Handling continuous real-time data updates

Keeping UI performant during frequent updates

Managing WebSocket connection state

Syncing backend events with frontend charts

Persisting alerts using MongoDB

## Testing & Validation

### Automated Tests
- Backend API was tested using Vitest and Supertest.
- Implemented unit test for health endpoint:
  - GET /api/health → returns `{ ok: true }`

### Manual Testing
- WebSocket connection tested by stopping and restarting backend server.
- Dashboard correctly switches between live and offline states.
- Authentication flow tested (register → login → dashboard access).


📚 Future Improvements
Authentication & user roles

Historical data view

Advanced alert filtering

Dashboard customization

Deployment (Docker / Cloud)

👤 Author
Vahid Aliyev
Frontend Developer (Student)

Merve Arslan 
Backend Developer (Student)

📝 License
This project is developed for educational purposes.