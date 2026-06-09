import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    status: { type: String, enum: ['pending', 'accepted', 'completed'], default: 'pending' },
    seekerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ngoId: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO' },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true }
    },
    completionNote: { type: String, default: '' },
    proofImage: { type: String, default: '' },
    completedAt: Date
  },
  { timestamps: true }
);

taskSchema.index({ location: '2dsphere' });
taskSchema.index({ status: 1, category: 1, createdAt: -1 });
taskSchema.pre('validate', function setLocation(next) {
  if (this.longitude !== undefined && this.latitude !== undefined) {
    this.location = { type: 'Point', coordinates: [this.longitude, this.latitude] };
  }
  next();
});

export default mongoose.model('Task', taskSchema);
