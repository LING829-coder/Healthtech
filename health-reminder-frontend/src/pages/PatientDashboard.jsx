import React from 'react';
import ReminderList from '../components/Reminders/ReminderList';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const PatientDashboard = () => {
  const upcomingReminders = [
    { id: 1, type: 'Appointment', date: '2023-06-15', time: '10:30 AM', doctor: 'Dr. Smith' },
    { id: 2, type: 'Medication', medication: 'Lisinopril', time: '8:00 AM', dosage: '10mg' }
  ];

  return (
    <div className="dashboard">
      <Typography variant="h4" gutterBottom>Your Health Reminders</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <ReminderList reminders={upcomingReminders} />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Quick Actions</Typography>
              <button className="btn btn-primary">Confirm Next Appointment</button>
              <button className="btn btn-secondary">Request Refill</button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default function PatientDashboard() {
  return <div>Patient Dashboard</div>;
}