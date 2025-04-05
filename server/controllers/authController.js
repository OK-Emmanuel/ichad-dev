const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authController = {
  register: async (req, res) => {
    try {
      const { name, email, password, role = 'user' } = req.body;

      // Check if user exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
      });

      // Generate tokens
      const token = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      res.status(201).json({
        data: {
          token,
          refreshToken,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
        message: 'Registration successful',
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Error creating user', error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password, remember = false } = req.body;

      // Basic validation
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
      if (typeof email !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ message: 'Invalid input format' });
      }

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate tokens
      const token = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      res.json({
        data: {
          token,
          refreshToken,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
        message: 'Login successful',
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  logout: async (req, res) => {
    // For now, just a placeholder since client handles cleanup
    res.json({ message: 'Logged out successfully' });
  },

  refreshToken: async (req, res) => {
    try {
      const { refreshToken } = req.body; // Expect refresh token in body
      if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token is required' });
      }

      // Verify refresh token
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      // Check if user still exists
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Generate new access token
      const newAccessToken = generateAccessToken(user);

      res.json({
        data: {
          token: newAccessToken,
        },
        message: 'Token refreshed successfully',
      });
    } catch (error) {
      console.error('Refresh token error:', error);
      res.status(401).json({ message: 'Invalid refresh token' });
    }
  },

  getCurrentUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        data: { user },
        message: 'User retrieved successfully',
      });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },
};

// Helper functions
function generateAccessToken(user) {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
}

function generateRefreshToken(user) {
  return jwt.sign(
    { userId: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
}

module.exports = authController;