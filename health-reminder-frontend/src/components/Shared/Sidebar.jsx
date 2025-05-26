import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Dashboard,
  CalendarToday,
  Medication,
  Settings,
  People,
  NotificationsActive
} from '@mui/icons-material';

const Sidebar = ({ width = 240, open, onClose }) => {
  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/' },
    { text: 'Appointments', icon: <CalendarToday />, path: '/appointments' },
    { text: 'Medications', icon: <Medication />, path: '/medications' },
    { text: 'Reminders', icon: <NotificationsActive />, path: '/reminders' },
    { text: 'Patients', icon: <People />, path: '/patients' },
    { text: 'Settings', icon: <Settings />, path: '/settings' }
  ];

  return (
    <Drawer
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <Toolbar /> {/* For proper spacing below AppBar */}
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;