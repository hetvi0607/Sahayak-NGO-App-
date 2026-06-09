import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    type: { type: String, enum: ['task', 'admin', 'system'], default: 'system' }
  },
  { timestamps: true }
);

notificationSchema.index({ userId: 1, read: 1, createdAt: -1 });
export default mongoose.model('Notification', notificationSchema);
