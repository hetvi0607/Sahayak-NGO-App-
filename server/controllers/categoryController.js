import asyncHandler from '../utils/asyncHandler.js';
import Category from '../models/Category.js';

export const getCategories = asyncHandler(async (req, res) => {
  res.json(await Category.find({ active: true }).sort('name'));
});
