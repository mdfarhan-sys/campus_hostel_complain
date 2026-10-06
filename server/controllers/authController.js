import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import { isConnectedToMongo } from '../config/db.js';
import { inMemoryUsers } from '../seed/memoryStore.js';
import bcrypt from 'bcryptjs';

// @desc    Register a new student or staff user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, studentOrStaffId, password, role = 'student', hostel, roomNumber, phone } = req.body;

    if (!name || !email || !studentOrStaffId || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (name, email, studentOrStaffId, password)',
      });
    }

    if (isConnectedToMongo) {
      const userExists = await User.findOne({ 
        $or: [{ email: email.toLowerCase() }, { studentOrStaffId }] 
      });

      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'A user with this email or student/staff ID already exists',
        });
      }

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        studentOrStaffId,
        password,
        role,
        hostel: hostel || 'General Campus',
        roomNumber: roomNumber || '',
        phone: phone || '',
      });

      return res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          studentOrStaffId: user.studentOrStaffId,
          role: user.role,
          hostel: user.hostel,
          roomNumber: user.roomNumber,
          token: generateToken(user._id, user.role),
        },
      });
    } else {
      // In-memory fallback
      const exists = inMemoryUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() || u.studentOrStaffId === studentOrStaffId
      );

      if (exists) {
        return res.status(400).json({
          success: false,
          message: 'A user with this email or student/staff ID already exists',
        });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const newUser = {
        _id: `usr_${Date.now()}`,
        name,
        email: email.toLowerCase(),
        studentOrStaffId,
        password: hashedPassword,
        role,
        hostel: hostel || 'General Campus',
        roomNumber: roomNumber || '',
        phone: phone || '',
        createdAt: new Date().toISOString(),
      };

      inMemoryUsers.push(newUser);

      return res.status(201).json({
        success: true,
        data: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          studentOrStaffId: newUser.studentOrStaffId,
          role: newUser.role,
          hostel: newUser.hostel,
          roomNumber: newUser.roomNumber,
          token: generateToken(newUser._id, newUser.role),
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    const { emailOrId, password } = req.body;

    if (!emailOrId || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email/student ID and password',
      });
    }

    if (isConnectedToMongo) {
      const user = await User.findOne({
        $or: [
          { email: emailOrId.toLowerCase() },
          { studentOrStaffId: emailOrId }
        ]
      }).select('+password');

      if (user && (await user.matchPassword(password))) {
        return res.json({
          success: true,
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            studentOrStaffId: user.studentOrStaffId,
            role: user.role,
            hostel: user.hostel,
            roomNumber: user.roomNumber,
            token: generateToken(user._id, user.role),
          },
        });
      } else {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. Please verify your email/ID and password',
        });
      }
    } else {
      // In-memory fallback
      const user = inMemoryUsers.find(
        (u) =>
          u.email.toLowerCase() === emailOrId.toLowerCase() ||
          u.studentOrStaffId.toLowerCase() === emailOrId.toLowerCase()
      );

      if (user && bcrypt.compareSync(password, user.password)) {
        return res.json({
          success: true,
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            studentOrStaffId: user.studentOrStaffId,
            role: user.role,
            hostel: user.hostel,
            roomNumber: user.roomNumber,
            token: generateToken(user._id, user.role),
          },
        });
      } else {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. Please verify your email/ID and password',
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  res.json({
    success: true,
    data: req.user,
  });
};

// @desc    Get technician & staff directory
// @route   GET /api/auth/staff
// @access  Private (Warden/Admin)
export const getStaffDirectory = async (req, res, next) => {
  try {
    if (isConnectedToMongo) {
      const staff = await User.find({ role: { $in: ['technician', 'warden'] } }).select('-password');
      res.json({ success: true, count: staff.length, data: staff });
    } else {
      const staff = inMemoryUsers
        .filter((u) => ['technician', 'warden'].includes(u.role))
        .map(({ password, ...rest }) => rest);
      res.json({ success: true, count: staff.length, data: staff });
    }
  } catch (error) {
    next(error);
  }
};
