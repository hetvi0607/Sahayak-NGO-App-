import crypto from 'crypto';
import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.js';
import { publicUser, signToken } from '../utils/token.js';
import { sendEmail } from '../services/emailService.js';

export const register = asyncHandler(async (req, res) => {
  const { name, email, phone, password, role, latitude, longitude, address } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Email already registered' });
  const user = await User.create({
    name,
    email,
    phone,
    password,
    role: role || 'seeker',
    address,
    location: { type: 'Point', coordinates: [Number(longitude || 0), Number(latitude || 0)] }
  });
  res.status(201).json({ token: signToken(user), user: publicUser(user) });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  if (user.isBanned) return res.status(403).json({ message: 'Account banned' });
  res.json({ token: signToken(user), user: publicUser(user) });
});

export const me = asyncHandler(async (req, res) => {
  res.json(publicUser(req.user));
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.json({ message: 'If the email exists, a reset link was sent' });
  const rawToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = crypto.createHash('sha256').update(rawToken).digest('hex');
  user.resetPasswordExpires = Date.now() + 30 * 60 * 1000;
  await user.save();
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${rawToken}`;
  await sendEmail({
    to: user.email,
    subject: 'Reset your SahayaK password',
    html: `<p>Click this link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>`
  });
  res.json({ message: 'If the email exists, a reset link was sent' });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const hashed = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({ resetPasswordToken: hashed, resetPasswordExpires: { $gt: Date.now() } });
  if (!user) return res.status(400).json({ message: 'Invalid or expired token' });
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  res.json({ message: 'Password reset successful' });
});
