const { validationResult } = require('express-validator');
const Image = require('../models/Image');
const imageService = require('../services/imageService');

const galleryController = {
  getAllImages: async (req, res) => {
    try {
      const images = await Image.find()
        .populate('album', 'name')
        .sort('-createdAt');
      res.json({ data: images });
    } catch (error) {
      console.error('Error fetching images:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  getOne: async (req, res) => {
    try {
      const image = await Image.findById(req.params.id)
        .populate('album', 'name');
      
      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }
      
      res.json({ data: image });
    } catch (error) {
      console.error('Error fetching image:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  create: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'No image file provided' });
      }

      console.log('File received:', req.file);
      console.log('Request body:', req.body);
      
      const result = await imageService.uploadImage(req.file, {
        albumId: req.body.album
      });

      const image = new Image({
        title: req.body.title,
        url: result.url,
        publicId: result.publicId,
        album: req.body.album || null,
        status: req.body.status || 'public'
      });

      await image.save();
      res.status(201).json({ data: image });
    } catch (error) {
      console.error('Error creating image:', error);
      res.status(500).json({ message: error.message || 'Failed to upload image' });
    }
  },

  update: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      console.log('Update request body:', req.body);

      const image = await Image.findById(req.params.id);
      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }

      // Handle new image upload if provided
      if (req.file) {
        await imageService.deleteImage(image.publicId);
        const result = await imageService.uploadImage(req.file, {
          albumId: req.body.album
        });
        image.url = result.url;
        image.publicId = result.publicId;
      }

      // Update other fields
      if (req.body.title) {
        image.title = req.body.title;
      }
      
      // Handle album field - allow setting to null
      if (req.body.album === '') {
        image.album = null;
      } else if (req.body.album) {
        image.album = req.body.album;
      }
      
      // Update status if provided
      if (req.body.status) {
        // Validate status value
        if (['private', 'public'].includes(req.body.status)) {
          image.status = req.body.status;
        } else {
          return res.status(400).json({ message: 'Invalid status value' });
        }
      }

      await image.save();
      res.json({ data: image });
    } catch (error) {
      console.error('Error updating image:', error);
      res.status(500).json({ message: 'Failed to update image' });
    }
  },

  delete: async (req, res) => {
    try {
      const image = await Image.findById(req.params.id);
      
      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }

      // Delete image from cloud storage
      if (image.publicId) {
        try {
          await imageService.deleteImage(image.publicId);
        } catch (cloudinaryError) {
          console.error('Error deleting image from Cloudinary:', cloudinaryError);
        }
      }

      await Image.deleteOne({ _id: image._id });
      
      res.json({ 
        success: true,
        message: 'Image deleted successfully' 
      });
    } catch (error) {
      console.error('Error deleting image:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to delete image' 
      });
    }
  },

  getPublishedImages: async (req, res) => {
    try {
      console.log('Fetching public images');
      const images = await Image.find({ status: 'public' })
        .populate('album', 'name')
        .sort('-createdAt');
      
      console.log(`Found ${images.length} public images`);
      res.json({ data: images });
    } catch (error) {
      console.error('Error fetching public images:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  getAlbumImages: async (req, res) => {
    try {
      const albumId = req.params.id;
      console.log(`Fetching images for album: ${albumId}`);
      
      const images = await Image.find({ 
        album: albumId,
        status: 'public' 
      })
        .populate('album', 'name')
        .sort('-createdAt');
      
      console.log(`Found ${images.length} public images in album ${albumId}`);
      res.json({ data: images });
    } catch (error) {
      console.error('Error fetching album images:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = galleryController;
