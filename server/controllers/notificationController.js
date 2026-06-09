import asyncHandler from '../utils/asyncHandler.js';
import Notification from '../models/Notification.js';

export const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ userId: req.user._id }).sort('-createdAt');
  res.json(notifications);
});

export const markRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    { read: true },
    { new: true }
  );
  res.json(notification);
});
