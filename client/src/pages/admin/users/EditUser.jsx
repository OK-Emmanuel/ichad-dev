import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/admin/AdminLayout';
import UserForm from './UserForm';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { users } from '../../../services/api';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await users.getOne(id);
      setUser(response.data.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      toast.error('Failed to fetch user details');
      navigate('/admin/users');
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
        <h1 className="text-2xl font-bold">Edit User</h1>
        <p className="text-gray-600 mt-1">Update user details</p>
      </div>
      <UserForm user={user} />
    </AdminLayout>
  );
};

export default EditUser; 