import AdminLayout from '../../../components/admin/AdminLayout';
import EventForm from './EventForm';

const NewEvent = () => {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New Event</h1>
        <p className="text-gray-600 mt-1">Add a new event to your calendar</p>
      </div>
      <EventForm />
    </AdminLayout>
  );
};

export default NewEvent; 