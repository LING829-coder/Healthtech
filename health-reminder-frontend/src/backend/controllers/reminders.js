const { Reminder, User } = require('../models');
const { sendNotification } = require('../utils/notifications');

exports.getAllReminders = async (req, res) => {
  try {
    const reminders = await Reminder.findAll({
      where: { userId: req.user.id },
      order: [['dueDate', 'ASC']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email', 'phone']
        }
      ]
    });

    res.status(200).json({
      status: 'success',
      results: reminders.length,
      data: {
        reminders
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

exports.createReminder = async (req, res) => {
  try {
    const reminder = await Reminder.create({
      ...req.body,
      userId: req.user.id
    });

    const user = await User.findByPk(req.user.id);
    await sendNotification(reminder, user);

    res.status(201).json({
      status: 'success',
      data: {
        reminder
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.updateReminder = async (req, res) => {
  try {
    const [updated] = await Reminder.update(req.body, {
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!updated) {
      return res.status(404).json({
        status: 'fail',
        message: 'No reminder found with that ID'
      });
    }

    const updatedReminder = await Reminder.findByPk(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        reminder: updatedReminder
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.deleteReminder = async (req, res) => {
  try {
    const deleted = await Reminder.destroy({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!deleted) {
      return res.status(404).json({
        status: 'fail',
        message: 'No reminder found with that ID'
      });
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};