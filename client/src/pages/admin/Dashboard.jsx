import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/admin/AdminLayout';
import LoadingSpinner from '../../components/LoadingSpinner';
import { LineChart, BarChart } from '../../components/charts';
// import { posts, events, gallery, programs } from '../../services/api';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    posts: 0,
    events: 0,
    gallery: 0,
    programs: 0,
    recentPosts: [],
    upcomingEvents: [],
    analytics: {
      visitors: [],
      pageViews: [],
      popular: [],
      engagement: [],
      demographics: {
        age: [],
        location: []
      }
    }
  });

  const [timeframe, setTimeframe] = useState('week'); // week, month, year

  useEffect(() => {
    fetchDashboardData();
  }, [timeframe]);

  const fetchDashboardData = async () => {
    try {
      // Fetch all data in parallel
      const [
        postsData,
        eventsData,
        galleryData,
        programsData
      ] = await Promise.all([
        posts.getAll(),
        events.getAll(),
        gallery.getAll(),
        programs.getAll()
      ]);

      // Add mock analytics data
      const mockAnalytics = generateMockAnalytics(timeframe);
      setStats(prev => ({
        ...prev,
        posts: postsData.data.data.length,
        events: eventsData.data.data.length,
        gallery: galleryData.data.data.length,
        programs: programsData.data.data.length,
        recentPosts: postsData.data.data.slice(0, 5),
        upcomingEvents: eventsData.data.data
          .filter(event => new Date(event.date) > new Date())
          .slice(0, 5),
        analytics: mockAnalytics
      }));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickStat
            title="Total Posts"
            value={stats.posts}
            icon="ri-article-line"
            color="blue"
            link="/admin/posts"
          />
          <QuickStat
            title="Upcoming Events"
            value={stats.events}
            icon="ri-calendar-line"
            color="green"
            link="/admin/events"
          />
          <QuickStat
            title="Gallery Items"
            value={stats.gallery}
            icon="ri-image-line"
            color="purple"
            link="/admin/gallery"
          />
          <QuickStat
            title="Active Programs"
            value={stats.programs}
            icon="ri-lightbulb-line"
            color="yellow"
            link="/admin/programs"
          />
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Visitors Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Visitor Traffic</h3>
              <select 
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="px-3 py-1 border rounded-lg text-sm"
              >
                <option value="week">Last 7 days</option>
                <option value="month">Last 30 days</option>
                <option value="year">Last 12 months</option>
              </select>
            </div>
            <LineChart
              data={stats.analytics.visitors}
              xKey="date"
              yKey="value"
              color="#4F46E5"
            />
          </div>

          {/* Page Views Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-6">Popular Content</h3>
            <BarChart
              data={stats.analytics.popular}
              xKey="title"
              yKey="views"
              color="#10B981"
            />
          </div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Posts */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
            <div className="space-y-4">
              {stats.recentPosts.map((post) => (
                <div key={post._id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <i className="ri-article-line text-gray-400 text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{post.title}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              {stats.upcomingEvents.map((event) => (
                <div key={event._id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <i className="ri-calendar-line text-gray-400 text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <QuickLink
                to="/admin/posts/new"
                icon="ri-add-line"
                label="Create New Post"
              />
              <QuickLink
                to="/admin/events/new"
                icon="ri-calendar-2-line"
                label="Schedule Event"
              />
              <QuickLink
                to="/admin/gallery/new"
                icon="ri-image-add-line"
                label="Upload to Gallery"
              />
              <QuickLink
                to="/admin/programs/new"
                icon="ri-lightbulb-line"
                label="Add New Program"
              />
              <QuickLink
                to="/admin/settings"
                icon="ri-settings-3-line"
                label="Manage Settings"
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

// Helper Components
const QuickStat = ({ title, value, icon, color, link }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    yellow: 'bg-yellow-50 text-yellow-600'
  };

  return (
    <Link to={link}>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          <div className={`p-3 rounded-full ${colors[color]}`}>
            <i className={`${icon} text-xl`}></i>
          </div>
        </div>
      </div>
    </Link>
  );
};

const QuickLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
  >
    <i className={`${icon} text-xl text-gray-500 mr-3`}></i>
    <span>{label}</span>
  </Link>
);

// Helper function to generate mock analytics data
const generateMockAnalytics = (timeframe) => {
  // Generate mock data based on timeframe
  const visitors = [];
  const popular = [
    { title: 'Home Page', views: 1200 },
    { title: 'About Us', views: 850 },
    { title: 'Programs', views: 720 },
    { title: 'Gallery', views: 650 },
    { title: 'Contact', views: 450 }
  ];

  // Generate date-based visitor data
  const days = timeframe === 'week' ? 7 : timeframe === 'month' ? 30 : 12;
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    visitors.unshift({
      date: date.toLocaleDateString(),
      value: Math.floor(Math.random() * 500) + 100
    });
  }

  return {
    visitors,
    popular
  };
};

export default Dashboard; 