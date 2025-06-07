// utils/imageOptimizer.js

export const optimizeImageUrl = (url, width, height, format = 'webp', quality = 'auto') => {
    // If the URL is not from Cloudinary, return the original URL
    if (!url.includes('cloudinary.com')) {
      return url;
    }
  
    // Build transformation string dynamically
    let transformation = `f_${format},q_${quality}`;
    if (width) transformation += `,w_${width}`;
    if (height) transformation += `,h_${height},c_fill`;
    
    return url.replace(/\/upload\//, `/upload/${transformation}/`);
  };
  