import asyncHandler from '../utils/asyncHandler.js';
import SurveyResponse from '../models/SurveyResponse.js';

export const submitSurvey = asyncHandler(async (req, res) => {
  const response = await SurveyResponse.create(req.body);
  res.status(201).json(response);
});

export const surveyAnalytics = asyncHandler(async (req, res) => {
  const responses = await SurveyResponse.find().lean();
  const totals = ['q1', 'q2', 'q3', 'q4', 'q5'].map((key) => ({
    question: key,
    yes: responses.filter((r) => r[key]).length,
    no: responses.filter((r) => !r[key]).length
  }));
  res.json({ total: responses.length, totals });
});

export const exportCsv = asyncHandler(async (req, res) => {
  const rows = await SurveyResponse.find().lean();
  const header = 'q1,q2,q3,q4,q5,city,comments,createdAt\n';
  const body = rows.map((r) => [r.q1, r.q2, r.q3, r.q4, r.q5, r.city, `"${(r.comments || '').replaceAll('"', '""')}"`, r.createdAt.toISOString()].join(',')).join('\n');
  res.header('Content-Type', 'text/csv');
  res.attachment('sahayak-survey.csv');
  res.send(header + body);
});
