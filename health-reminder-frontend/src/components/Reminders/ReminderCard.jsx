import React from 'react';
import { Card, CardContent, Typography, Button, Chip } from '@mui/material';

const ReminderCard = ({ reminder }) => {
  const getIcon = () => {
    switch(reminder.type) {
      case 'Appointment': return '📅';
      case 'Medication': return '💊';
      default: return '🔔';
    }
  };

  return (
    <Card className="reminder-card" style={{ marginBottom: '10px' }}>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">
            {getIcon()} {reminder.type}
          </Typography>
          <Chip label={reminder.status || 'Pending'} color="primary" />
        </div>
        
        <Typography variant="body1">
          {reminder.type === 'Appointment' 
            ? `With ${reminder.doctor} at ${reminder.time}`
            : `Take ${reminder.medication} (${reminder.dosage})`}
        </Typography>
        
        <div style={{ marginTop: '10px' }}>
          <Button size="small" variant="outlined">Snooze</Button>
          <Button size="small" variant="contained" style={{ marginLeft: '8px' }}>Confirm</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReminderCard;