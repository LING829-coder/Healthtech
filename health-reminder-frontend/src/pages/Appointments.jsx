import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Tabs, 
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

import { Add, CalendarMonth } from '@mui/icons-material';
import ReminderForm from './components/Reminders/ReminderForm';

const Appointments = () => {
  const [tabValue, setTabValue] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const appointments = [
    { id: 1, patient: 'John Doe', date: '2023-06-15', time: '10:30 AM', type: 'Follow-up', status: 'Confirmed' },
    { id: 2, patient: 'Sarah Smith', date: '2023-06-16', time: '2:00 PM', type: 'New Patient', status: 'Pending' }
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSaveReminder = (data) => {
    console.log('Reminder saved:', data);
    setShowForm(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">
          <CalendarMonth sx={{ verticalAlign: 'middle', mr: 1 }} />
          Appointments
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={() => setShowForm(true)}
        >
          New Reminder
        </Button>
      </Box>

      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Upcoming" />
        <Tab label="Past" />
        <Tab label="Cancelled" />
      </Tabs>

      {showForm ? (
        <Box sx={{ mt: 3 }}>
          <ReminderForm 
            onSave={handleSaveReminder} 
            onCancel={() => setShowForm(false)}
          />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appt) => (
                <TableRow key={appt.id}>
                  <TableCell>{appt.patient}</TableCell>
                  <TableCell>{appt.date}</TableCell>
                  <TableCell>{appt.time}</TableCell>
                  <TableCell>{appt.type}</TableCell>
                  <TableCell>{appt.status}</TableCell>
                  <TableCell>
                    <Button size="small">Send Reminder</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Appointments;