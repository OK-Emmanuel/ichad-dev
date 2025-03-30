import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/admin/AdminLayout';
import EventForm from './EventForm';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { events } from '../../../services/api';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await events.getOne(id);
      setEvent(response.data.data);
    } catch (error) {
      console.error('Error fetching event:', error);
      toast.error('Failed to fetch event');
      navigate('/admin/events');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Event</h1>
        <p className="text-gray-600 mt-1">Update event details</p>
      </div>
      <EventForm event={event} />
    </AdminLayout>
  );
};

export default EditEvent; 