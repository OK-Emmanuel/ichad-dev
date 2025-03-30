const Settings = require('../models/Settings');
const imageService = require('../services/imageService');
const { validationResult } = require('express-validator');

const settingsController = {
  getSettings: async (req, res) => {
    try {
      let settings = await Settings.findOne();
      
      if (!settings) {
        settings = await Settings.create({});
      }
      
      res.json({ data: settings });
    } catch (error) {
      console.error('Error fetching settings:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  updateSettings: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let settings = await Settings.findOne();
      if (!settings) {
        settings = new Settings();
      }

      // Handle logo upload
      if (req.files?.logo) {
        if (settings.appearance?.logoPublicId) {
          await imageService.deleteImage(settings.appearance.logoPublicId);
        }
        const logoResult = await imageService.uploadBuffer(req.files.logo[0].buffer);
        settings.appearance = {
          ...settings.appearance,
          logo: logoResult.secure_url,
          logoPublicId: logoResult.public_id
        };
      }

      // Handle favicon upload
      if (req.files?.favicon) {
        if (settings.appearance?.faviconPublicId) {
          await imageService.deleteImage(settings.appearance.faviconPublicId);
        }
        const faviconResult = await imageService.uploadBuffer(req.files.favicon[0].buffer);
        settings.appearance = {
          ...settings.appearance,
          favicon: faviconResult.secure_url,
          faviconPublicId: faviconResult.public_id
        };
      }

      // Update other fields
      const updateData = {
        siteName: req.body.siteName,
        siteDescription: req.body.siteDescription,
        contactEmail: req.body.contactEmail,
        contactPhone: req.body.contactPhone,
        address: req.body.address,
        socialMedia: req.body.socialMedia,
        footer: req.body.footer,
        seo: req.body.seo,
        appearance: {
          ...settings.appearance,
          primaryColor: req.body.appearance?.primaryColor,
          secondaryColor: req.body.appearance?.secondaryColor
        }
      };

      Object.assign(settings, updateData);
      await settings.save();

      res.json({ 
        success: true,
        data: settings,
        message: 'Settings updated successfully' 
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to update settings' 
      });
    }
  }
};

module.exports = settingsController;
