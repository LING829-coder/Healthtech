import React, { useState } from 'react';
import { FormControlLabel, Checkbox, Typography, Paper } from '@mui/material';

const ChannelPreferences = () => {
  const [preferences, setPreferences] = useState({
    email: true,
    sms: true,
    whatsapp: false,
    push: true
  });

  const handleChange = (channel) => (event) => {
    setPreferences({ ...preferences, [channel]: event.target.checked });
  };

  return (
    <Paper style={{ padding: '20px' }}>
      <Typography variant="h6" gutterBottom>Notification Preferences</Typography>
      
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={preferences.email}
              onChange={handleChange('email')}
              color="primary"
            />
          }
          label="Email"
        />
        
        <FormControlLabel
          control={
            <Checkbox
              checked={preferences.sms}
              onChange={handleChange('sms')}
              color="primary"
            />
          }
          label="SMS"
        />
        
        <FormControlLabel
          control={
            <Checkbox
              checked={preferences.whatsapp}
              onChange={handleChange('whatsapp')}
              color="primary"
            />
          }
          label="WhatsApp"
        />
        
        <FormControlLabel
          control={
            <Checkbox
              checked={preferences.push}
              onChange={handleChange('push')}
              color="primary"
            />
          }
          label="Push Notifications"
        />
      </div>
    </Paper>
  );
};

export default ChannelPreferences;