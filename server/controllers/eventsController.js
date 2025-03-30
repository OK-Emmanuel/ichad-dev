const { validationResult } = require('express-validator');
const Event = require('../models/Event');
const imageService = require('../services/imageService');

const eventsController = {
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.find()
        .populate('author', 'name email avatar')
        .sort({ date: 1 })
        .lean();
      
      const formattedEvents = events.map(event => ({
        ...event,
        date: new Date(event.date).toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }),
        tags: Array.isArray(event.tags) ? event.tags : []
      }));
      
      res.json({ data: formattedEvents });
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  getEvent: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id)
        .populate('author', 'name email avatar');
      
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      
      res.json({ data: event });
    } catch (error) {
      console.error('Error fetching event:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  createEvent: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let imageUrl = null;
      let imagePublicId = null;

      if (req.file) {
        const result = await imageService.uploadBuffer(req.file.buffer);
        imageUrl = result.secure_url;
        imagePublicId = result.public_id;
      }

      // Parse tags
      let tags = [];
      if (req.body.tags) {
        try {
          tags = JSON.parse(req.body.tags);
        } catch (e) {
          console.error('Error parsing tags:', e);
          return res.status(400).json({ 
            message: 'Invalid tags format',
            error: e.message 
          });
        }
      }

      // Create event object with validated data
      const eventData = {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        category: req.body.category,
        status: req.body.status || 'draft',
        registrationLink: req.body.registrationLink,
        tags,
        featuredImage: imageUrl,
        imagePublicId,
        author: req.user.userId
      };

      const event = new Event(eventData);
      await event.save();
      await event.populate('author', 'name email avatar');
      
      res.status(201).json({ data: event });
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ 
        message: 'Failed to create event',
        error: error.message 
      });
    }
  },

  updateEvent: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      // Parse tags
      let tags = [];
      if (req.body.tags) {
        try {
          tags = JSON.parse(req.body.tags);
        } catch (e) {
          console.error('Error parsing tags:', e);
          return res.status(400).json({ 
            message: 'Invalid tags format',
            error: e.message 
          });
        }
      }

      // Handle image upload if new image is provided
      if (req.file) {
        if (event.imagePublicId) {
          await imageService.deleteImage(event.imagePublicId);
        }
        const result = await imageService.uploadBuffer(req.file.buffer);
        event.featuredImage = result.secure_url;
        event.imagePublicId = result.public_id;
      }

      // Update event with validated data
      Object.assign(event, {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        category: req.body.category,
        status: req.body.status,
        registrationLink: req.body.registrationLink,
        tags,
        featuredImage: event.featuredImage
      });

      await event.save();
      await event.populate('author', 'name email avatar');

      res.json({ data: event });
    } catch (error) {
      console.error('Error updating event:', error);
      res.status(500).json({ 
        message: 'Failed to update event',
        error: error.message 
      });
    }
  },

  deleteEvent: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      if (event.imagePublicId) {
        try {
          await imageService.deleteImage(event.imagePublicId);
        } catch (cloudinaryError) {
          console.error('Error deleting image from Cloudinary:', cloudinaryError);
        }
      }

      await Event.deleteOne({ _id: event._id });
      
      res.json({ 
        success: true,
        message: 'Event deleted successfully' 
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to delete event',
        error: error.message 
      });
    }
  }
};

module.exports = eventsController; 