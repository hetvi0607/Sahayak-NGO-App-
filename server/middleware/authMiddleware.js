import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function protect(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null;
    if (!token) return res.status(401).json({ message: 'Not authorized, token missing' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.isBanned) return res.status(401).json({ message: 'Account unavailable' });
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token invalid' });
  }
}

export function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'You do not have permission for this action' });
    }
    next();
  };
}
