import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton,
  Avatar,
  Box
} from '@mui/material';
import { Menu, Notifications } from '@mui/icons-material';

const Header = ({ onMenuClick }) => {
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <Menu />
        </IconButton>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          HealthConnect Reminders
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" sx={{ mr: 1 }}>
            <Notifications />
          </IconButton>
          <Avatar alt="User" src="/static/images/avatar/1.jpg" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;