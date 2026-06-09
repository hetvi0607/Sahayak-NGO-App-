import asyncHandler from '../utils/asyncHandler.js';

export const uploadProfile = asyncHandler(async (req, res) => {
  res.json({ url: `/uploads/profiles/${req.file.filename}` });
});

export const uploadProof = asyncHandler(async (req, res) => {
  res.json({ url: `/uploads/proofs/${req.file.filename}` });
});
