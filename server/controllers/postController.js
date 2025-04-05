console.log('Loading post controller');

exports.createPost = async (req, res) => {
  console.log('postController.createPost called');
  try {
    // Log validation results
    const errors = validationResult(req);
    console.log('Validation errors:', errors.array());
    
    // Rest of the method...
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
}; 