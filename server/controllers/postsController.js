const { validationResult } = require('express-validator');
const Post = require('../models/Post');
const imageService = require('../services/imageService');

const postsController = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find()
        .populate('author', 'name email avatar')
        .sort({ createdAt: -1 });
      
      console.log('Fetched posts:', posts); // Debug log
      res.json({ data: posts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Post.findOne({ slug: req.params.slug })
        .populate('author', 'name email avatar');
      
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      // Ensure publishedAt is set for published posts
      if (post.status === 'published' && !post.publishedAt) {
        post.publishedAt = post.updatedAt || post.createdAt;
        await post.save();
      }
      
      res.json({ data: post });
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  createPost: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Handle tags if they come as a string
      let tags = req.body.tags;
      if (typeof tags === 'string') {
        tags = tags.split(',').map(tag => tag.trim());
      }

      let imageUrl = null;
      let imagePublicId = null;

      if (req.file) {
        const result = await imageService.uploadBuffer(req.file.buffer);
        imageUrl = result.secure_url;
        imagePublicId = result.public_id;
      }

      if (req.body.imageUrl && !req.file) {
        imageUrl = req.body.imageUrl;
      }

      const slug = req.body.slug || req.body.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const post = new Post({
        ...req.body,
        tags,  // Use processed tags
        slug,
        featuredImage: imageUrl,
        imagePublicId,
        author: req.user.userId
      });

      await post.save();
      await post.populate('author', 'name email avatar');
      
      res.status(201).json({ data: post });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ 
        message: 'Failed to create post',
        error: error.message 
      });
    }
  },

  updatePost: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      // Handle image upload if present
      if (req.file) {
        // Delete old image if exists
        if (post.imagePublicId) {
          await imageService.deleteImage(post.imagePublicId);
        }

        const result = await imageService.uploadBuffer(req.file.buffer);
        post.featuredImage = result.secure_url;
        post.imagePublicId = result.public_id;
      }

      // Handle image URL if provided instead of file
      if (req.body.imageUrl && !req.file) {
        post.featuredImage = req.body.imageUrl;
        // Clear old image public ID if it exists
        if (post.imagePublicId) {
          await imageService.deleteImage(post.imagePublicId);
          post.imagePublicId = null;
        }
      }

      Object.assign(post, {
        ...req.body,
        featuredImage: post.featuredImage // Preserve image if not being updated
      });

      await post.save();
      await post.populate('author', 'name email avatar');

      res.json({ data: post });
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ message: 'Failed to update post' });
    }
  },

  deletePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      // Delete image from Cloudinary if exists
      if (post.imagePublicId) {
        try {
          await imageService.deleteImage(post.imagePublicId);
        } catch (cloudinaryError) {
          console.error('Error deleting image from Cloudinary:', cloudinaryError);
          // Continue with post deletion even if image deletion fails
        }
      }

      // Use deleteOne instead of remove
      await Post.deleteOne({ _id: post._id });
      
      res.json({ 
        success: true,
        message: 'Post deleted successfully' 
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to delete post',
        error: error.message 
      });
    }
  }
};

module.exports = postsController; 