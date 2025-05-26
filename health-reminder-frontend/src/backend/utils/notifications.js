const nodemailer = require('nodemailer');
const twilio = require('twilio');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const twilioClient = new twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

exports.sendNotification = async (reminder, user) => {
  try {
    // Email notification
    if (reminder.notifyEmail && user.emailNotifications) {
      await transporter.sendMail({
        from: `"Health Reminder System" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: `Reminder: ${reminder.title}`,
        text: `Hello ${user.name},\n\nThis is a reminder for: ${reminder.title}\n\nDescription: ${reminder.description}\n\nDue: ${reminder.dueDate}\n\nThank you!`,
        html: `<p>Hello ${user.name},</p><p>This is a reminder for: <strong>${reminder.title}</strong></p><p>Description: ${reminder.description}</p><p>Due: ${reminder.dueDate}</p><p>Thank you!</p>`
      });
    }

    // SMS notification
    if (reminder.notifySMS && user.smsNotifications && user.phone) {
      await twilioClient.messages.create({
        body: `Reminder: ${reminder.title}\nDue: ${reminder.dueDate}\nDescription: ${reminder.description}`,
        from: process.env.TWILIO_PHONE,
        to: user.phone
      });
    }

    // WhatsApp notification
    if (reminder.notifyWhatsApp && user.whatsappNotifications && user.phone) {
      await twilioClient.messages.create({
        body: `Reminder: ${reminder.title}\nDue: ${reminder.dueDate}\nDescription: ${reminder.description}`,
        from: `whatsapp:${process.env.TWILIO_PHONE}`,
        to: `whatsapp:${user.phone}`
      });
    }
  } catch (err) {
    console.error('Notification error:', err);
  }
};