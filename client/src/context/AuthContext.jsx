import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../services/auth';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (auth.isAuthenticated()) {
          const storedUser = localStorage.getItem('auth_user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
          const freshUser = await auth.getCurrentUser();
          if (freshUser) {
            setUser(freshUser);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();
  }, []);

  useEffect(() => {
    if (!auth.isAuthenticated()) return;

    const refreshInterval = setInterval(async () => {
      try {
        await auth.refreshToken();
      } catch (error) {
        console.error('Token refresh failed:', error);
        setUser(null); // Logout on failure, but we'll improve this later
        toast.error('Session expired. Please log in again.');
      }
    }, 12 * 60 * 1000); // Refresh every 12 minutes (close to 15m expiry)

    return () => clearInterval(refreshInterval);
  }, [user]);

  const login = async (credentials) => {
    try {
      const { user: userData } = await auth.login(credentials);
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
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: auth.isAuthenticated,
      }}
    >
      {!loading ? children : <div>Loading...</div>}
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