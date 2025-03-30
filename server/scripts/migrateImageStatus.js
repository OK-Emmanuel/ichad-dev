const mongoose = require('mongoose');
require('dotenv').config();
const Image = require('../models/Image');

const migrateImageStatus = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Update all 'draft' status to 'private'
    const draftResult = await Image.updateMany(
      { status: 'draft' },
      { $set: { status: 'private' } }
    );

    // Update all 'published' status to 'public'
    const publishedResult = await Image.updateMany(
      { status: 'published' },
      { $set: { status: 'public' } }
    );

    console.log(`Updated ${draftResult.modifiedCount} draft images to private`);
    console.log(`Updated ${publishedResult.modifiedCount} published images to public`);

    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
};

migrateImageStatus(); 