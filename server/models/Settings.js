const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    required: true,
    default: 'Navigatu'
  },
  siteDescription: {
    type: String,
    required: true,
    default: 'Empowering Pacific Youth'
  },
  contactEmail: {
    type: String,
    required: true
  },
  contactPhone: {
    type: String
  },
  address: {
    type: String
  },
  socialMedia: {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String,
    youtube: String
  },
  footer: {
    copyrightText: {
      type: String,
      default: '© 2024 Navigatu. All rights reserved.'
    },
    quickLinks: [{
      label: String,
      url: String
    }]
  },
  seo: {
    metaDescription: String,
    metaKeywords: String,
    ogImage: String
  },
  appearance: {
    logo: String,
    logoPublicId: String,
    favicon: String,
    faviconPublicId: String,
    primaryColor: {
      type: String,
      default: '#1a56db'
    },
    secondaryColor: {
      type: String,
      default: '#7e3af2'
    }
  }
}, {
  timestamps: true
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
