import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production'
  ? '/api'
  : 'http://localhost:1337/api';

export const updates = {
  getAll: async () => {
    try {
      const [postsResponse, eventsResponse] = await Promise.all([
        axios.get(`${API_URL}/posts?populate=*`),
        axios.get(`${API_URL}/events?populate=*`)
      ]);

      // Combine and sort by date
      const allUpdates = [
        ...postsResponse.data.data.map(post => ({
          ...post.attributes,
          id: post.id,
          type: 'post',
          coverImage: post.attributes.coverImage?.data?.attributes
        })),
        ...eventsResponse.data.data.map(event => ({
          ...event.attributes,
          id: event.id,
          type: 'event',
          coverImage: event.attributes.coverImage?.data?.attributes
        }))
      ];

      return { data: allUpdates };
    } catch (error) {
      console.error('Error fetching updates:', error);
      throw error;
    }
  },

  getBySlug: async (slug, type) => {
    try {
      const endpoint = type === 'event' ? 'events' : 'posts';
      const response = await axios.get(`${API_URL}/${endpoint}?filters[slug][$eq]=${slug}&populate=*`);
      
      if (!response.data.data || response.data.data.length === 0) {
        throw new Error('Update not found');
      }

      const update = response.data.data[0];
      return {
        data: [{
          ...update.attributes,
          id: update.id,
          type,
          coverImage: update.attributes.coverImage?.data?.attributes
        }]
      };
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      throw error;
    }
  }
}; 