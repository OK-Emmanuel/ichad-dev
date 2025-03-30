import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { 
      title: 'Dashboard', 
      path: '/admin/dashboard', 
      icon: 'ri-dashboard-line' 
    },
    { 
      title: 'Posts', 
      path: '/admin/posts', 
      icon: 'ri-article-line' 
    },
    { 
      title: 'Programs', 
      path: '/admin/programs', 
      icon: 'ri-lightbulb-line' 
    },
    { 
      title: 'Events', 
      path: '/admin/events', 
      icon: 'ri-calendar-line' 
    },
    { 
      title: 'Gallery', 
      path: '/admin/gallery', 
      icon: 'ri-image-line' 
    },
    { 
      title: 'Settings', 
      path: '/admin/settings', 
      icon: 'ri-settings-3-line' 
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } bg-white border-r w-64`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b">
            <Link to="/admin/dashboard" className="text-xl font-bold text-primary">
              ICHAD Admin
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <i className={`${item.icon} text-xl mr-3`}></i>
                {item.title}
              </Link>
            ))}
          </nav>

          {/* User Info */}
          <div className="p-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-500"
              >
                <i className="ri-logout-box-line text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Header */}
        <header className="bg-white border-b">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className={`text-xl ${isSidebarOpen ? 'ri-menu-fold-line' : 'ri-menu-unfold-line'}`}></i>
            </button>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700">
                <i className="ri-notification-3-line text-xl"></i>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 