import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const locationSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    role: { type: String, enum: ['seeker', 'volunteer', 'admin', 'ngo'], default: 'seeker' },
    helpScore: { type: Number, default: 0 },
    completedTasks: { type: Number, default: 0 },
    profileImage: { type: String, default: '' },
    address: { type: String, default: '' },
    isBanned: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    location: locationSchema
  },
  { timestamps: true }
);

userSchema.index({ location: '2dsphere' });
userSchema.index({ role: 1, helpScore: -1 });

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.matchPassword = function matchPassword(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.badge = function badge() {
  if (this.completedTasks >= 100) return 'Platinum';
  if (this.completedTasks >= 50) return 'Gold';
  if (this.completedTasks >= 20) return 'Silver';
  if (this.completedTasks >= 5) return 'Bronze';
  return 'New Helper';
};

export default mongoose.model('User', userSchema);
