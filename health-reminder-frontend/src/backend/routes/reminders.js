const express = require('express');
const reminderController = require('../controllers/reminderController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router
  .route('/')
  .get(reminderController.getAllReminders)
  .post(reminderController.createReminder);

router
  .route('/:id')
  .patch(reminderController.updateReminder)
  .delete(reminderController.deleteReminder);

module.exports = router;