import asyncHandler from '../utils/asyncHandler.js';
import NGO from '../models/NGO.js';
import Task from '../models/Task.js';

export const registerNgo = asyncHandler(async (req, res) => {
  const ngo = await NGO.create(req.body);
  res.status(201).json(ngo);
});

export const getNgos = asyncHandler(async (req, res) => {
  res.json(await NGO.find().populate('volunteers', 'name email helpScore'));
});

export const ngoReport = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ ngoId: req.params.id }).populate('volunteerId seekerId', 'name email phone');
  res.json({ totalRequests: tasks.length, completed: tasks.filter((t) => t.status === 'completed').length, tasks });
});
