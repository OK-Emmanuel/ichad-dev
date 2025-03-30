import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../services/auth';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  // Set up refresh token interval
  useEffect(() => {
    if (!auth.isAuthenticated()) return;

    const refreshInterval = setInterval(async () => {
      try {
        await auth.refreshToken();
      } catch (error) {
        console.error('Failed to refresh token:', error);
        logout();
      }
    }, 4 * 60 * 1000); // Refresh every 4 minutes

    return () => clearInterval(refreshInterval);
  }, [user]);

  const checkAuth = async () => {
    try {
      if (auth.isAuthenticated()) {
        const { data } = await auth.getCurrentUser();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('auth_token');
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  };

  const login = async (credentials, remember = false) => {
    try {
      const { user: userData } = await auth.login(credentials, remember);
      setUser(userData);
      return userData;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('auth_token');
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        initialized,
        login, 
        logout,
        isAuthenticated: auth.isAuthenticated 
      }}
    >
      {initialized && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 