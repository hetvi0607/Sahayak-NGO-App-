import mongoose from 'mongoose';

const ngoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    address: { type: String, required: true },
    contactPerson: { type: String, required: true },
    verified: { type: Boolean, default: false },
    volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

export default mongoose.model('NGO', ngoSchema);
