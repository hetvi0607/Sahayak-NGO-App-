import asyncHandler from '../utils/asyncHandler.js';
import Task from '../models/Task.js';
import User from '../models/User.js';
import { notifyUser } from '../services/notificationService.js';
import { taskAcceptedTemplate, taskCompletedTemplate } from '../services/emailService.js';

const buildQuery = (query) => {
  const filter = {};
  if (query.category) filter.category = query.category;
  if (query.status) filter.status = query.status;
  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: 'i' } },
      { address: { $regex: query.search, $options: 'i' } }
    ];
  }
  if (query.date) {
    const start = new Date(query.date);
    const end = new Date(query.date);
    end.setDate(end.getDate() + 1);
    filter.createdAt = { $gte: start, $lt: end };
  }
  return filter;
};

export const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create({ ...req.body, seekerId: req.user._id });
  res.status(201).json(task);
});

export const getTasks = asyncHandler(async (req, res) => {
  const filter = buildQuery(req.query);
  if (req.user.role === 'seeker') filter.seekerId = req.user._id;
  if (req.user.role === 'volunteer' && req.query.mine === 'accepted') filter.volunteerId = req.user._id;
  const tasks = await Task.find(filter).populate('seekerId volunteerId', 'name phone email helpScore profileImage').sort('-createdAt');
  res.json(tasks);
});

export const getNearbyTasks = asyncHandler(async (req, res) => {
  const longitude = Number(req.query.longitude);
  const latitude = Number(req.query.latitude);
  const distanceKm = Number(req.query.distance || 5);
  const tasks = await Task.find({
    ...buildQuery(req.query),
    status: 'pending',
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates: [longitude, latitude] },
        $maxDistance: distanceKm * 1000
      }
    }
  }).populate('seekerId', 'name phone');
  res.json(tasks);
});

export const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id).populate('seekerId volunteerId', 'name email phone helpScore profileImage completedTasks');
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (req.user.role !== 'admin' && String(task.seekerId) !== String(req.user._id)) {
    return res.status(403).json({ message: 'Only the seeker or admin can update this task' });
  }
  Object.assign(task, req.body);
  await task.save();
  res.json(task);
});

export const acceptTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id).populate('seekerId');
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (task.status !== 'pending') return res.status(400).json({ message: 'Task is already accepted or completed' });
  task.status = 'accepted';
  task.volunteerId = req.user._id;
  await task.save();
  await notifyUser(task.seekerId, `${req.user.name} accepted your request: ${task.title}`, 'task', taskAcceptedTemplate(task, req.user));
  res.json(task);
});

export const completeTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id).populate('seekerId');
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (String(task.volunteerId) !== String(req.user._id) && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only assigned volunteer can complete this task' });
  }
  task.status = 'completed';
  task.completionNote = req.body.completionNote || task.completionNote;
  task.proofImage = req.file ? `/uploads/proofs/${req.file.filename}` : task.proofImage;
  task.completedAt = new Date();
  await task.save();
  if (req.user.role === 'volunteer') {
    await User.findByIdAndUpdate(req.user._id, { $inc: { helpScore: 10, completedTasks: 1 } });
  }
  await notifyUser(task.seekerId, `Your request was completed: ${task.title}`, 'task', taskCompletedTemplate(task));
  res.json(task);
});

export const deleteTask = asyncHandler(async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

export const analytics = asyncHandler(async (req, res) => {
  const [totalTasks, completedTasks, pendingTasks, monthly, categoryStats] = await Promise.all([
    Task.countDocuments(),
    Task.countDocuments({ status: 'completed' }),
    Task.countDocuments({ status: 'pending' }),
    Task.aggregate([{ $group: { _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } }, count: { $sum: 1 } } }, { $sort: { _id: 1 } }]),
    Task.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }, { $sort: { count: -1 } }])
  ]);
  res.json({ totalTasks, completedTasks, pendingTasks, monthly, categoryStats });
});
