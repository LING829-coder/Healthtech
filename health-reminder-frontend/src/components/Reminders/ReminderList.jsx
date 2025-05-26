import React from 'react';
import ReminderCard from './ReminderCard';
import { List, Typography } from '@mui/material';

const ReminderList = ({ reminders }) => {
  return (
    <div className="reminder-list">
      <Typography variant="h6" gutterBottom>Upcoming Reminders</Typography>
      
      {reminders.length === 0 ? (
        <p>No upcoming reminders</p>
      ) : (
        <List>
          {reminders.map(reminder => (
            <ReminderCard key={reminder.id} reminder={reminder} />
          ))}
        </List>
      )}
    </div>
  );
};

export default ReminderList;