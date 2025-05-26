# Healthtech

A web application for managing health reminders, appointments, and medications.

## Features

- User authentication (login/logout)
- Dashboard for patients
- Manage appointments and medications
- Set reminders with notifications
- Responsive UI

## Technologies Used

- **Frontend:** React, Material-UI, React Router
- **Backend:** Node.js, Express
- **Database:** (e.g., PostgreSQL, MySQL, or SQLite)
- **ORM:** Sequelize

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/healthtech.git
   cd healthtech
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd health-reminder-frontend
   npm install
   ```

### Running the Application

1. **Start the backend server:**
   ```bash
   node server.js
   ```

2. **Start the frontend app:**
   ```bash
   cd health-reminder-frontend
   npm start
   ```

3. Open your browser and go to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
healthtech/
├── health-reminder-frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── app.js
│       └── index.js
├── migrations/
├── models/
├── routes/
├── server.js
└── README.md
```

## License

This project is licensed under the MIT License.
