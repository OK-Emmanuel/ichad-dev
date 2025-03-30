const { validationResult } = require('express-validator');
const Program = require('../models/Program');
const imageService = require('../services/imageService');

const programsController = {
  getAllPrograms: async (req, res) => {
    try {
      const programs = await Program.find()
        .populate('author', 'name email avatar')
        .sort({ createdAt: -1 });
      
      res.json({ data: programs });
    } catch (error) {
      console.error('Error fetching programs:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  getProgram: async (req, res) => {
    try {
      const program = await Program.findOne({ slug: req.params.slug })
        .populate('author', 'name email avatar');
      
      if (!program) {
        return res.status(404).json({ message: 'Program not found' });
      }

      if (program.status === 'published' && !program.publishedAt) {
        program.publishedAt = program.updatedAt || program.createdAt;
        await program.save();
      }
      
      res.json({ data: program });
    } catch (error) {
      console.error('Error fetching program:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  createProgram: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let tags = req.body.tags;
      if (typeof tags === 'string') {
        tags = tags.split(',').map(tag => tag.trim());
      }

      let imageUrl = null;
      let imagePublicId = null;

      if (req.file) {
        const result = await imageService.uploadBuffer(req.file.buffer);
        imageUrl = result.secure_url;
        imagePublicId = result.public_id;
      }

      const slug = req.body.slug || req.body.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const program = new Program({
        ...req.body,
        tags,
        slug,
        featuredImage: imageUrl,
        imagePublicId,
        author: req.user.userId
      });

      await program.save();
      await program.populate('author', 'name email avatar');
      
      res.status(201).json({ data: program });
    } catch (error) {
      console.error('Error creating program:', error);
      res.status(500).json({ 
        message: 'Failed to create program',
        error: error.message 
      });
    }
  },

  updateProgram: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const program = await Program.findById(req.params.id);
      if (!program) {
        return res.status(404).json({ message: 'Program not found' });
      }

      if (req.file) {
        if (program.imagePublicId) {
          await imageService.deleteImage(program.imagePublicId);
        }
        const result = await imageService.uploadBuffer(req.file.buffer);
        program.featuredImage = result.secure_url;
        program.imagePublicId = result.public_id;
      }

      Object.assign(program, {
        ...req.body,
        featuredImage: program.featuredImage
      });

      await program.save();
      await program.populate('author', 'name email avatar');

      res.json({ data: program });
    } catch (error) {
      console.error('Error updating program:', error);
      res.status(500).json({ message: 'Failed to update program' });
    }
  },

  deleteProgram: async (req, res) => {
    try {
      const program = await Program.findById(req.params.id);
      
      if (!program) {
        return res.status(404).json({ message: 'Program not found' });
      }

      if (program.imagePublicId) {
        try {
          await imageService.deleteImage(program.imagePublicId);
        } catch (cloudinaryError) {
          console.error('Error deleting image from Cloudinary:', cloudinaryError);
        }
      }

      await Program.deleteOne({ _id: program._id });
      
      res.json({ 
        success: true,
        message: 'Program deleted successfully' 
      });
    } catch (error) {
      console.error('Error deleting program:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to delete program',
        error: error.message 
      });
    }
  }
};

module.exports = programsController; 