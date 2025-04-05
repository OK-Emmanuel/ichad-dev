const axios = require('axios');

exports.getGoogleReviews = async (req, res) => {
  try {
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
    const PLACE_ID = process.env.GOOGLE_PLACE_ID; // Your business Place ID
    
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${GOOGLE_API_KEY}`
    );
    
    if (response.data && response.data.result && response.data.result.reviews) {
      // Filter reviews to only include those with 4 or 5 stars
      const filteredReviews = response.data.result.reviews.filter(
        review => review.rating >= 4
      );
      
      res.json({ reviews: filteredReviews });
    } else {
      res.status(404).json({ message: 'No reviews found' });
    }
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};