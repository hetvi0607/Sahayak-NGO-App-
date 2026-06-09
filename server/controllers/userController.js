import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.js';
import Task from '../models/Task.js';
import { publicUser } from '../utils/token.js';

export const getUsers = asyncHandler(async (req, res) => {
  const filter = req.query.role ? { role: req.query.role } : {};
  const users = await User.find(filter).sort('-createdAt');
  res.json(users.map(publicUser));
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  const { name, phone, address, latitude, longitude } = req.body;
  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (address) user.address = address;
  if (latitude && longitude) user.location = { type: 'Point', coordinates: [Number(longitude), Number(latitude)] };
  if (req.file) user.profileImage = `/uploads/profiles/${req.file.filename}`;
  await user.save();
  res.json(publicUser(user));
});

export const banUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { isBanned: true }, { new: true });
  res.json(publicUser(user));
});

export const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

export const dashboardStats = asyncHandler(async (req, res) => {
  const [totalUsers, totalVolunteers, totalSeekers, totalTasks, completedTasks, topVolunteers] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: 'volunteer' }),
    User.countDocuments({ role: 'seeker' }),
    Task.countDocuments(),
    Task.countDocuments({ status: 'completed' }),
    User.find({ role: 'volunteer' }).sort('-helpScore').limit(8)
  ]);
  res.json({ totalUsers, totalVolunteers, totalSeekers, totalTasks, completedTasks, topVolunteers: topVolunteers.map(publicUser) });
});
