const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    required: true,
    default: 'ICHAD PRoject'
  },
  siteDescription: {
    type: String,
    required: true,
    default: 'Purpose, Passion and Possibility'
  },
  contactEmail: {
    type: String,
    required: true,
    defualt: "info@ichadproject.org"
  },
  contactPhone: {
    type: String,
    default: "234 703 369 6676"
  },
  address: {
    type: String,
    default: "ICHAD Project Suit 11, Jesus is Lord Shopping complex, Ota 112104, Ogun State, Nigeria"
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
      default: '© 2025 ICHAD Project. All rights reserved.'
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
