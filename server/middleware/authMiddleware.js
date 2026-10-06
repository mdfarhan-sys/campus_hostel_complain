import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { isConnectedToMongo } from '../config/db.js';
import { inMemoryUsers } from '../seed/memoryStore.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'campusfix_jwt_secret_key_2026_super_secure_token'
      );

      if (isConnectedToMongo) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        // Fallback store
        const found = inMemoryUsers.find((u) => u._id === decoded.id || u.id === decoded.id);
        if (found) {
          const { password, ...safeUser } = found;
          req.user = safeUser;
        }
      }

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized, user profile not found',
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token invalid or expired',
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no bearer token supplied',
    });
  }
};

// Optional auth: attatches req.user if token is present, continues even if not
export const optionalAuth = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'campusfix_jwt_secret_key_2026_super_secure_token'
      );

      if (isConnectedToMongo) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        const found = inMemoryUsers.find((u) => u._id === decoded.id || u.id === decoded.id);
        if (found) {
          const { password, ...safeUser } = found;
          req.user = safeUser;
        }
      }
    } catch {
      // Ignored for optional
    }
  }
  next();
};

// Grant access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user?.role || 'Guest'}' is not authorized to access this resource`,
      });
    }
    next();
  };
};
