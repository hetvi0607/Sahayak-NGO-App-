import asyncHandler from '../utils/asyncHandler.js';

export const futureModules = asyncHandler(async (req, res) => {
  res.json({
    message: 'Future-ready AI architecture placeholders. No external AI API is used.',
    modules: [
      { name: 'AI Scheme Recommendation', endpoint: '/api/ai/scheme-recommendation', status: 'placeholder' },
      { name: 'AI Task Categorization', endpoint: '/api/ai/task-categorization', status: 'placeholder' },
      { name: 'WhatsApp Bot Integration', endpoint: '/api/ai/whatsapp-bot', status: 'placeholder' },
      { name: 'Voice Request Support', endpoint: '/api/ai/voice-request', status: 'placeholder' }
    ]
  });
});
