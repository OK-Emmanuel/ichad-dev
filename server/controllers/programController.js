const Program = require('../models/Program');
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

// Get all programs
exports.getAllPrograms = async (req, res) => {
  try {
    console.log('Getting all programs');
    const programs = await Program.find().sort({ createdAt: -1 });
    res.json({ data: programs });
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({ message: 'Error fetching programs' });
  }
};

// Get a single program by slug
exports.getProgram = async (req, res) => {
  try {
    console.log('Getting program with slug:', req.params.slug);
    const program = await Program.findOne({ slug: req.params.slug });
    
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }
    
    res.json({ data: program });
  } catch (error) {
    console.error('Error fetching program:', error);
    res.status(500).json({ message: 'Error fetching program' });
  }
};

// Create a new program
exports.createProgram = async (req, res) => {
  try {
    console.log('Received program creation request');
    console.log('Request body:', req.body);
    console.log('Files:', req.files);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const newProgram = new Program({
      title: req.body.title,
      summary: req.body.summary || '',
      content: req.body.content,
      status: req.body.status || 'draft',
      coverImage: req.file ? `/uploads/${req.file.filename}` : null,
      createdBy: req.user ? req.user.id : null
    });
    
    const savedProgram = await newProgram.save();
    console.log('Program created:', savedProgram);
    
    res.status(201).json({
      data: savedProgram,
      message: 'Program created successfully'
    });
  } catch (error) {
    console.error('Error creating program:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update a program
exports.updateProgram = async (req, res) => {
  try {
    console.log('Updating program with ID:', req.params.id);
    console.log('Update data:', req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const program = await Program.findById(req.params.id);
    
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }
    
    // Update fields if provided
    if (req.body.title) program.title = req.body.title;
    if (req.body.summary !== undefined) program.summary = req.body.summary;
    if (req.body.content) program.content = req.body.content;
    if (req.body.status) program.status = req.body.status;
    
    // Update cover image if provided
    if (req.file) {
      // Delete old image if exists
      if (program.coverImage) {
        const oldImagePath = path.join(__dirname, '..', program.coverImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      
      program.coverImage = `/uploads/${req.file.filename}`;
    }
    
    const updatedProgram = await program.save();
    console.log('Program updated:', updatedProgram);
    
    res.json({
      data: updatedProgram,
      message: 'Program updated successfully'
    });
  } catch (error) {
    console.error('Error updating program:', error);
    res.status(500).json({ message: 'Error updating program' });
  }
};

// Delete a program
exports.deleteProgram = async (req, res) => {
  try {
    console.log('Deleting program with ID:', req.params.id);
    
    const program = await Program.findById(req.params.id);
    
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }
    
    // Delete cover image if exists
    if (program.coverImage) {
      const imagePath = path.join(__dirname, '..', program.coverImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    await program.remove();
    console.log('Program deleted');
    
    res.json({ message: 'Program deleted successfully' });
  } catch (error) {
    console.error('Error deleting program:', error);
    res.status(500).json({ message: 'Error deleting program' });
  }
};