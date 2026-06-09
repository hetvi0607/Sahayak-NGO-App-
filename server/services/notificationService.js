import Notification from '../models/Notification.js';
import { sendEmail } from './emailService.js';

export async function notifyUser(user, message, type = 'system', emailHtml = '') {
  const notification = await Notification.create({ userId: user._id, message, type });
  if (user.email && emailHtml) {
    await sendEmail({ to: user.email, subject: 'SahayaK Notification', html: emailHtml });
  }
  return notification;
}
