import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Chip,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import { 
  CalendarToday, 
  AccessTime, 
  NotificationsActive,
  Person,
  LocalHospital,
  Medication
} from '@mui/icons-material';

const DoctorDashboard = () => {
  // Sample data - in a real app this would come from an API
  const [upcomingAppointments, setUpcomingAppointments] = useState([
    { 
      id: 1, 
      patientName: 'John Doe', 
      time: '10:30 AM', 
      date: '2023-06-15', 
      type: 'Follow-up',
      status: 'Confirmed',
      reminders: ['Email', 'SMS']
    },
    { 
      id: 2, 
      patientName: 'Sarah Smith', 
      time: '2:15 PM', 
      date: '2023-06-15', 
      type: 'New Patient',
      status: 'Pending',
      reminders: ['WhatsApp']
    }
  ]);

  const [pendingReminders, setPendingReminders] = useState([
    {
      id: 101,
      patientName: 'Michael Johnson',
      type: 'Medication Refill',
      medication: 'Lisinopril 10mg',
      dueDate: '2023-06-16',
      channel: 'SMS'
    },
    {
      id: 102,
      patientName: 'Emily Davis',
      type: 'Annual Checkup',
      dueDate: '2023-06-20',
      channel: 'Email'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter appointments based on selection
  const filteredAppointments = upcomingAppointments.filter(appt => {
    const matchesFilter = filter === 'all' || appt.status.toLowerCase() === filter;
    const matchesSearch = appt.patientName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSendReminder = (appointmentId) => {
    // In a real app, this would call an API
    console.log(`Sending reminder for appointment ${appointmentId}`);
    alert(`Reminder sent for appointment ${appointmentId}`);
  };

  const handleStatusChange = (appointmentId, newStatus) => {
    setUpcomingAppointments(prev => 
      prev.map(appt => 
        appt.id === appointmentId ? { ...appt, status: newStatus } : appt
      )
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        <LocalHospital sx={{ verticalAlign: 'middle', mr: 1 }} />
        Doctor Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Today's Appointments
              </Typography>
              <Typography variant="h3" component="div">
                {upcomingAppointments.length}
              </Typography>
              <CalendarToday color="primary" sx={{ fontSize: 40, mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Pending Reminders
              </Typography>
              <Typography variant="h3" component="div">
                {pendingReminders.length}
              </Typography>
              <NotificationsActive color="secondary" sx={{ fontSize: 40, mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Patients This Week
              </Typography>
              <Typography variant="h3" component="div">
                12
              </Typography>
              <Person color="success" sx={{ fontSize: 40, mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>

        {/* Appointments Table */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h5" component="h2">
                  Upcoming Appointments
                </Typography>
                <Box>
                  <TextField
                    label="Search Patients"
                    variant="outlined"
                    size="small"
                    sx={{ mr: 2 }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Filter</InputLabel>
                    <Select
                      value={filter}
                      label="Filter"
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="confirmed">Confirmed</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Patient</TableCell>
                      <TableCell>Date & Time</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Reminders</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>
                          <Typography fontWeight="bold">{appointment.patientName}</Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CalendarToday color="action" sx={{ mr: 1, fontSize: 16 }} />
                            {appointment.date}
                            <AccessTime color="action" sx={{ ml: 2, mr: 1, fontSize: 16 }} />
                            {appointment.time}
                          </Box>
                        </TableCell>
                        <TableCell>{appointment.type}</TableCell>
                        <TableCell>
                          <Chip 
                            label={appointment.status} 
                            color={
                              appointment.status === 'Confirmed' ? 'success' : 
                              appointment.status === 'Pending' ? 'warning' : 'error'
                            } 
                          />
                        </TableCell>
                        <TableCell>
                          {appointment.reminders.map((channel, index) => (
                            <Chip 
                              key={index} 
                              label={channel} 
                              size="small" 
                              sx={{ mr: 1 }} 
                            />
                          ))}
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="contained" 
                            size="small"
                            sx={{ mr: 1 }}
                            onClick={() => handleSendReminder(appointment.id)}
                          >
                            Send Reminder
                          </Button>
                          <Select
                            value={appointment.status}
                            size="small"
                            onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                            sx={{ minWidth: 120 }}
                          >
                            <MenuItem value="Confirmed">Confirm</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Cancelled">Cancel</MenuItem>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Reminders */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                <NotificationsActive sx={{ verticalAlign: 'middle', mr: 1 }} />
                Pending Reminders
              </Typography>
              
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Patient</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Details</TableCell>
                      <TableCell>Channel</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pendingReminders.map((reminder) => (
                      <TableRow key={reminder.id}>
                        <TableCell>{reminder.patientName}</TableCell>
                        <TableCell>
                          <Chip 
                            icon={<Medication fontSize="small" />} 
                            label={reminder.type} 
                            size="small" 
                          />
                        </TableCell>
                        <TableCell>
                          {reminder.medication || 'No details'}
                        </TableCell>
                        <TableCell>
                          <Chip label={reminder.channel} size="small" />
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outlined" 
                            size="small"
                            onClick={() => console.log(`Sending ${reminder.type} reminder`)}
                          >
                            Send Now
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Quick Actions
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button 
                  variant="contained" 
                  fullWidth
                  startIcon={<NotificationsActive />}
                >
                  Send Bulk Reminders
                </Button>
                
                <Button 
                  variant="outlined" 
                  fullWidth
                  startIcon={<CalendarToday />}
                >
                  Schedule Follow-ups
                </Button>
                
                <Button 
                  variant="outlined" 
                  fullWidth
                  startIcon={<Medication />}
                >
                  Review Medication Reminders
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DoctorDashboard;