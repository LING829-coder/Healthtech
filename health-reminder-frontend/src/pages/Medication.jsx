import React from 'react';
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Chip
} from '@mui/material';
import { Medication as MedicationIcon } from '@mui/icons-material';

const Medications = () => {
  const medications = [
    { id: 1, patient: 'John Doe', name: 'Lisinopril', dosage: '10mg', frequency: 'Daily', nextRefill: '2023-07-01' },
    { id: 2, patient: 'Sarah Smith', name: 'Metformin', dosage: '500mg', frequency: 'Twice Daily', nextRefill: '2023-06-20' }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        <MedicationIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
        Medication Management
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient</TableCell>
              <TableCell>Medication</TableCell>
              <TableCell>Dosage</TableCell>
              <TableCell>Frequency</TableCell>
              <TableCell>Next Refill</TableCell>
              <TableCell>Reminders</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medications.map((med) => (
              <TableRow key={med.id}>
                <TableCell>{med.patient}</TableCell>
                <TableCell>{med.name}</TableCell>
                <TableCell>{med.dosage}</TableCell>
                <TableCell>{med.frequency}</TableCell>
                <TableCell>{med.nextRefill}</TableCell>
                <TableCell>
                  <Chip label="Active" color="success" size="small" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default function Medications() {
  return <div>Medications</div>;
}