import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  Paper
} from '@mui/material';
import { 
  Schedule,
  Person,
  Email,
  Sms,
  WhatsApp,
  Notifications
} from '@mui/icons-material';

const ReminderForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    patientId: '',
    type: 'appointment',
    date: '',
    time: '',
    frequency: 'once',
    channels: {
      email: false,
      sms: false,
      whatsapp: false
    },
    message: ''
  });

  const patients = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Sarah Smith' },
    { id: '3', name: 'Michael Johnson' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleChannelChange = (channel) => (e) => {
    setFormData(prev => ({
      ...prev,
      channels: {
        ...prev.channels,
        [channel]: e.target.checked
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        <Notifications sx={{ verticalAlign: 'middle', mr: 1 }} />
        {initialData ? 'Edit Reminder' : 'Create New Reminder'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Reminder Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              margin="normal"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Patient</InputLabel>
              <Select
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                label="Patient"
                startAdornment={<Person sx={{ mr: 1 }} />}
              >
                {patients.map(patient => (
                  <MenuItem key={patient.id} value={patient.id}>
                    {patient.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Reminder Type</InputLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                label="Reminder Type"
              >
                <MenuItem value="appointment">Appointment</MenuItem>
                <MenuItem value="medication">Medication</MenuItem>
                <MenuItem value="follow-up">Follow-up</MenuItem>
                <MenuItem value="test">Test/Procedure</MenuItem>
                <MenuItem value="payment">Payment</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Frequency</InputLabel>
              <Select
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                label="Frequency"
              >
                <MenuItem value="once">Once</MenuItem>
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Time"
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Notification Channels
            </Typography>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.channels.email}
                    onChange={handleChannelChange('email')}
                    icon={<Email />}
                    checkedIcon={<Email color="primary" />}
                  />
                }
                label="Email"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.channels.sms}
                    onChange={handleChannelChange('sms')}
                    icon={<Sms />}
                    checkedIcon={<Sms color="primary" />}
                  />
                }
                label="SMS"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.channels.whatsapp}
                    onChange={handleChannelChange('whatsapp')}
                    icon={<WhatsApp />}
                    checkedIcon={<WhatsApp color="primary" />}
                  />
                }
                label="WhatsApp"
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Custom Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              multiline
              rows={4}
              margin="normal"
              placeholder="E.g., Don't forget your appointment tomorrow at 10 AM. Please bring your insurance card."
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" onClick={onCancel}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                startIcon={<Schedule />}
              >
                {initialData ? 'Update Reminder' : 'Create Reminder'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ReminderForm;