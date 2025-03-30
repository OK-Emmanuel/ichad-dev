const cloudinary = require('../config/cloudinary');
const { Readable } = require('stream');
const cloudinaryV2 = require('cloudinary').v2;

const imageService = {
  uploadBuffer: async (buffer, folder = 'posts') => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'auto'
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      const readableStream = new Readable({
        read() {
          this.push(buffer);
          this.push(null);
        }
      });

      readableStream.pipe(uploadStream);
    });
  },

  deleteImage: async (publicId) => {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  },

  uploadImage: async (file, options = {}) => {
    try {
      if (!file) {
        throw new Error('No file provided');
      }
      
      const folder = options.albumId 
        ? `gallery/albums/${options.albumId}`
        : 'gallery/unsorted';

      // Handle both buffer and path uploads
      const uploadParams = {
        folder,
        resource_type: 'auto'
      };
      
      let result;
      
      if (file.path) {
        // File is from multer disk storage
        result = await cloudinary.uploader.upload(file.path, uploadParams);
      } else if (file.buffer) {
        // File is from multer memory storage
        result = await uploadBufferToCloudinary(file.buffer, uploadParams);
      } else {
        throw new Error('Invalid file format');
      }

      return {
        url: result.secure_url,
        publicId: result.public_id
      };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  moveToAlbum: async (imageId, albumId) => {
    try {
      const newFolder = `gallery/albums/${albumId}`;
      const result = await cloudinaryV2.uploader.rename(
        imageId,
        `${newFolder}/${imageId.split('/').pop()}`,
        { invalidate: true }
      );
      return result;
    } catch (error) {
      console.error('Error moving image:', error);
      throw error;
    }
  }
};

// Helper function to upload buffer
const uploadBufferToCloudinary = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    const readableStream = new Readable({
      read() {
        this.push(buffer);
        this.push(null);
      }
    });

    readableStream.pipe(uploadStream);
  });
};

module.exports = imageService; 