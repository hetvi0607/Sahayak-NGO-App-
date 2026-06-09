import mongoose from 'mongoose';

const surveyResponseSchema = new mongoose.Schema(
  {
    q1: { type: Boolean, required: true },
    q2: { type: Boolean, required: true },
    q3: { type: Boolean, required: true },
    q4: { type: Boolean, required: true },
    q5: { type: Boolean, required: true },
    city: { type: String, default: '' },
    comments: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('SurveyResponse', surveyResponseSchema);
