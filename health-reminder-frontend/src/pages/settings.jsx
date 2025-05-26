import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab,
  Card,
  CardContent,
  FormControlLabel,
  Switch,
  TextField,
  Button
} from '@mui/material';
import { Settings as SettingsIcon, Notifications, AccountCircle } from '@mui/icons-material';

const Settings = () => {
  const [tabValue, setTabValue] = useState(0);
  const [notificationPrefs, setNotificationPrefs] = useState({
    email: true,
    sms: false,
    push: true,
    whatsapp: false
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleNotificationChange = (type) => (event) => {
    setNotificationPrefs({
      ...notificationPrefs,
      [type]: event.target.checked
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        <SettingsIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
        Settings
      </Typography>

      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab icon={<Notifications />} label="Notifications" />
        <Tab icon={<AccountCircle />} label="Profile" />
      </Tabs>

      {tabValue === 0 && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Notification Preferences
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={notificationPrefs.email}
                  onChange={handleNotificationChange('email')}
                />
              }
              label="Email Notifications"
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={notificationPrefs.sms}
                  onChange={handleNotificationChange('sms')}
                />
              }
              label="SMS Notifications"
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={notificationPrefs.push}
                  onChange={handleNotificationChange('push')}
                />
              }
              label="Push Notifications"
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={notificationPrefs.whatsapp}
                  onChange={handleNotificationChange('whatsapp')}
                />
              }
              label="WhatsApp Notifications"
            />
          </CardContent>
        </Card>
      )}

      {tabValue === 1 && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Profile Information
            </Typography>
            
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              defaultValue="Dr. Smith"
            />
            
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              defaultValue="dr.smith@example.com"
            />
            
            <TextField
              fullWidth
              label="Phone"
              margin="normal"
              defaultValue="+1 (555) 123-4567"
            />
            
            <Box sx={{ mt: 2 }}>
              <Button variant="contained">
                Save Changes
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Settings;