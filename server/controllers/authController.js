const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const authController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const user = await User.create({
        name,
        email,
        password
      });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
      });

      res.status(201).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error: error.message });
    }
  },

  login: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password, remember } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: remember ? '7d' : '1d' }
      );

      res.json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  logout: async (req, res) => {
    // In a more complex setup, you might want to invalidate the token
    res.json({ message: 'Logged out successfully' });
  },

  refresh: async (req, res) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      const newToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.json({ token: newToken });
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  },

  getCurrentUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).select('-password');
      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = authController; 