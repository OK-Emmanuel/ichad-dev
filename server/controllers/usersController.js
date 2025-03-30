const { validationResult } = require('express-validator');
const User = require('../models/User');
const imageService = require('../services/imageService');

const usersController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().select('-password');
      res.json({ data: users });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ data: user });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  createUser: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check if email already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      let avatarUrl = '';
      let avatarPublicId = '';

      if (req.file) {
        const result = await imageService.uploadBuffer(
          req.file.buffer,
          'users/avatars'
        );
        avatarUrl = result.secure_url;
        avatarPublicId = result.public_id;
      }

      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        status: req.body.status,
        avatar: avatarUrl
      });

      res.status(201).json({
        data: { ...user.toObject(), password: undefined }
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  updateUser: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Handle avatar upload
      if (req.file) {
        if (user.avatar) {
          try {
            await imageService.deleteImage(user.avatarPublicId);
          } catch (error) {
            console.error('Error deleting old avatar:', error);
          }
        }

        const result = await imageService.uploadBuffer(
          req.file.buffer,
          'users/avatars'
        );
        user.avatar = result.secure_url;
        user.avatarPublicId = result.public_id;
      }

      // Update user fields
      user.name = req.body.name;
      user.email = req.body.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      user.role = req.body.role;
      user.status = req.body.status;

      await user.save();

      res.json({
        data: { ...user.toObject(), password: undefined }
      });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Delete avatar if exists
      if (user.avatarPublicId) {
        try {
          await imageService.deleteImage(user.avatarPublicId);
        } catch (error) {
          console.error('Error deleting avatar:', error);
        }
      }

      await User.deleteOne({ _id: user._id });
      
      res.json({ 
        success: true,
        message: 'User deleted successfully' 
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = usersController; 