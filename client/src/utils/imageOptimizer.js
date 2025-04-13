// utils/imageOptimizer.js

export const optimizeImageUrl = (url, width = 500, height = 300, format = 'webp', quality = 'auto') => {
    // If the URL is not from Cloudinary, return the original URL
    if (!url.includes('cloudinary.com')) {
      return url;
    }
  
    // Build the optimized URL by adding Cloudinary transformations
    const transformedUrl = url
      .replace(/\/upload\//, `/upload/f_${format},q_${quality},w_${width},h_${height},c_fill/`);
    
    return transformedUrl;
  };
  