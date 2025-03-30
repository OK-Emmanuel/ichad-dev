const Album = require('../models/Album');
const Image = require('../models/Image');
const imageService = require('../services/imageService');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const albumController = {
  getAllAlbums: async (req, res) => {
    try {
      // Check if Album model is registered
      if (!mongoose.models['Album']) {
        console.log('Album model not found');
        return res.json({ data: [] });
      }
      
      // Create Album collection if it doesn't exist
      const collections = await mongoose.connection.db.listCollections({ name: 'albums' }).toArray();
      if (collections.length === 0) {
        console.log('Albums collection does not exist, returning empty array');
        return res.json({ data: [] });
      }
      
      // Find all albums
      const albums = await Album.find().sort({ createdAt: -1 });
      console.log(`Found ${albums.length} albums`);
      res.json({ data: albums });
    } catch (error) {
      console.error('Error in getAllAlbums:', error);
      res.json({ data: [] }); // Return empty array instead of error
    }
  },

  getAlbum: async (req, res) => {
    try {
      const album = await Album.findById(req.params.id);
      if (!album) {
        return res.status(404).json({ message: 'Album not found' });
      }
      res.json({ data: album });
    } catch (error) {
      console.error('Error fetching album:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  createAlbum: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      console.log('Create album request:', req.body);
      console.log('File in request:', req.file);

      let coverImageUrl = null;
      let coverImagePublicId = null;

      if (req.file) {
        const result = await imageService.uploadImage(req.file, {
          folder: 'gallery/album-covers'
        });
        coverImageUrl = result.url;
        coverImagePublicId = result.publicId;
      }

      const album = new Album({
        name: req.body.name,
        description: req.body.description || '',
        coverImage: coverImageUrl,
        coverImagePublicId: coverImagePublicId
      });

      await album.save();
      console.log('Album created:', album);
      res.status(201).json({ data: album });
    } catch (error) {
      console.error('Error creating album:', error);
      res.status(500).json({ message: error.message || 'Failed to create album' });
    }
  },

  updateAlbum: async (req, res) => {
    try {
      const album = await Album.findById(req.params.id);
      if (!album) {
        return res.status(404).json({ message: 'Album not found' });
      }

      if (req.file) {
        const result = await imageService.uploadImage(req.file.buffer, {
          folder: 'gallery/album-covers'
        });
        album.coverImage = result.url;
      }

      Object.assign(album, {
        name: req.body.name || album.name,
        description: req.body.description || album.description
      });

      await album.save();
      res.json({ data: album });
    } catch (error) {
      console.error('Error updating album:', error);
      res.status(500).json({ message: 'Failed to update album' });
    }
  },

  deleteAlbum: async (req, res) => {
    try {
      const album = await Album.findById(req.params.id);
      if (!album) {
        return res.status(404).json({ message: 'Album not found' });
      }

      // Move all images in this album to unsorted
      await Image.updateMany(
        { album: album._id },
        { $unset: { album: "" } }
      );

      await Album.deleteOne({ _id: album._id });
      res.json({ message: 'Album deleted successfully' });
    } catch (error) {
      console.error('Error deleting album:', error);
      res.status(500).json({ message: 'Failed to delete album' });
    }
  }
};

module.exports = albumController; 