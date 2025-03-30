const Category = require('../models/Category');
const { validationResult } = require('express-validator');

const categoriesController = {
  getAllCategories: async (req, res) => {
    try {
      const type = req.query.type || 'gallery';
      const categories = await Category.find({ type }).sort('name');
      res.json({ data: categories });
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  createCategory: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, type = 'gallery' } = req.body;
      
      const existingCategory = await Category.findOne({ 
        name: name.trim().toLowerCase(),
        type 
      });
      
      if (existingCategory) {
        return res.status(400).json({ 
          message: 'Category already exists' 
        });
      }

      const category = new Category({
        name: name.trim(),
        type
      });

      await category.save();
      res.status(201).json({ data: category });
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ message: 'Failed to create category' });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      await Category.deleteOne({ _id: category._id });
      
      res.json({ 
        success: true,
        message: 'Category deleted successfully' 
      });
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to delete category' 
      });
    }
  }
};

module.exports = categoriesController; 