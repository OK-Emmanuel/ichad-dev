import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/admin/AdminLayout';
import DataTable from '../../../components/admin/DataTable';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { events } from '../../../services/api';

const EventsList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const columns = [
    { 
      key: 'title', 
      label: 'Title',
      render: (item) => (
        <div>
          <div className="font-medium text-gray-900">
            {item.title.length > 30 
              ? `${item.title.substring(0, 30)}...` 
              : item.title}
          </div>
          <div className="text-sm text-gray-500">
            {new Date(item.date).toLocaleDateString()} at {item.time}
          </div>
        </div>
      )
    },
    { 
      key: 'location', 
      label: 'Location',
      render: (item) => (
        <span className="text-gray-600">{item.location}</span>
      )
    },
    { 
      key: 'category', 
      label: 'Category',
      render: (item) => (
        <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
          {item.category}
        </span>
      )
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (item) => {
        const statusConfig = {
          published: {
            color: 'bg-green-100 text-green-800',
            icon: 'ri-check-line'
          },
          draft: {
            color: 'bg-yellow-100 text-yellow-800',
            icon: 'ri-draft-line'
          }
        };
        const config = statusConfig[item.status] || statusConfig.draft;
        
        return (
          <span className={`px-3 py-1 rounded-full text-xs flex items-center w-fit gap-1 ${config.color}`}>
            <i className={config.icon}></i>
            {item.status}
          </span>
        );
      }
    },
    { 
      key: 'isUpcoming', 
      label: 'Timeline',
      render: (item) => (
        <span className={`px-3 py-1 rounded-full text-xs ${
          item.isUpcoming 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {item.isUpcoming ? 'Upcoming' : 'Past'}
        </span>
      )
    }
  ];

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await events.getAll();
      setData(response.data?.data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to fetch events');
      toast.error('Failed to fetch events');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    navigate(`/admin/events/edit/${event._id}`);
  };

  const handleDelete = async (event) => {
    try {
      const confirmed = window.confirm(
        `Are you sure you want to delete "${event.title}"? This action cannot be undone.`
      );
      
      if (confirmed) {
        const response = await events.delete(event._id);
        
        if (response.data.success) {
          toast.success('Event deleted successfully');
          fetchEvents();
        } else {
          throw new Error(response.data.message || 'Failed to delete event');
        }
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error(error.response?.data?.message || 'Failed to delete event. Please try again.');
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Events</h1>
          <p className="text-gray-600 mt-1">Manage your events</p>
        </div>
        <button
          onClick={() => navigate('/admin/events/new')}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
        >
          <i className="ri-add-line"></i>
          New Event
        </button>
      </div>

      {error ? (
        <div className="text-red-500 text-center py-8">{error}</div>
      ) : loading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchable={true}
          pagination={true}
          itemsPerPage={10}
        />
      )}
    </AdminLayout>
  );
};

export default EventsList; 