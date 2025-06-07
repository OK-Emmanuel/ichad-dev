import axios from 'axios';

// Configure base URL based on environment
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3900/api';

// Create axios instance with common configuration
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API services grouped by resource
export const teamService = {
  getTeamMembers: async () => {
    try {
      const response = await api.get('/team-members');
      return response.data;
    } catch (error) {
      console.error('Error fetching team members:', error);
      throw error;
    }
  },
  
  getAdvisoryMembers: async () => {
    try {
      const response = await api.get('/advisory-members');
      return response.data;
    } catch (error) {
      console.error('Error fetching advisory members:', error);
      throw error;
    }
  }
};

export const hubService = {
  getHubs: async () => {
    try {
      const response = await api.get('/hubs');
      return response.data;
    } catch (error) {
      console.error('Error fetching hubs:', error);
      throw error;
    }
  },
  
  getHubByName: async (hubName) => {
    try {
      const response = await api.get(`/hubs/name/${encodeURIComponent(hubName)}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching hub with name ${hubName}:`, error);
      throw error;
    }
  },
  
  getHubById: async (id) => {
    try {
      const response = await api.get(`/hubs/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching hub with id ${id}:`, error);
      throw error;
    }
  }
};

export const programService = {
  getPrograms: async () => {
    try {
      const response = await api.get('/programs');
      return response.data;
    } catch (error) {
      console.error('Error fetching programs:', error);
      throw error;
    }
  },
  
  getProgramBySlug: async (slug) => {
    try {
      const response = await api.get(`/programs/slug/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching program with slug ${slug}:`, error);
      throw error;
    }
  }
};

export const eventService = {
  getEvents: async () => {
    try {
      const response = await api.get('/events');
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },
  
  getEventBySlug: async (slug) => {
    try {
      const response = await api.get(`/events/slug/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching event with slug ${slug}:`, error);
      throw error;
    }
  }
};

export const postService = {
  getPosts: async () => {
    try {
      const response = await api.get('/posts');
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },
  
  getPostBySlug: async (slug) => {
    try {
      const response = await api.get(`/posts/slug/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching post with slug ${slug}:`, error);
      throw error;
    }
  }
};

export const configService = {
  getSiteConfig: async () => {
    try {
      const response = await api.get('/site-config');
      return response.data;
    } catch (error) {
      console.error('Error fetching site config:', error);
      throw error;
    }
  },
  
  getBanner: async (page) => {
    try {
      // Ensure page has no leading slash to avoid double slash in URL
      const pagePath = page.startsWith('/') ? page.substring(1) : page;
      const response = await api.get(`/banners/${pagePath}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching banner for ${page}:`, error);
      // Return null instead of throwing the error to gracefully fall back to defaults
      return null;
    }
  }
};

export const aboutService = {
  getAboutContent: async () => {
    try {
      const response = await api.get('/about-content');
      return response.data;
    } catch (error) {
      console.error('Error fetching about content:', error);
      throw error;
    }
  },
  
  getAboutContentBySection: async (section) => {
    try {
      const response = await api.get(`/about-content/${section}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching about content for section ${section}:`, error);
      throw error;
    }
  }
};

export const hubLeaderService = {
  getHubLeaders: async () => {
    try {
      const response = await api.get('/hub-leaders');
      return response.data;
    } catch (error) {
      console.error('Error fetching hub leaders:', error);
      throw error;
    }
  },
  
  getHubLeadersByHub: async (hubId) => {
    try {
      const response = await api.get(`/hub-leaders/hub/${hubId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching hub leaders for hub ${hubId}:`, error);
      throw error;
    }
  }
};

export default api;