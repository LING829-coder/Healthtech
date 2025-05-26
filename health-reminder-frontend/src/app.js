import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Sidebar from './components/Shared/Sidebar';
import Header from './components/Shared/Header';
import PatientDashboard from './pages/PatientDashboard';
import Appointments from './pages/Appointments';
import Medications from './pages/Medications';
import Login from './pages/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar onLogout={handleLogout} />
        <div style={{ flex: 1 }}>
          <Header />
          <Routes>
            <Route path="/" element={<PatientDashboard />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/medications" element={<Medications />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;