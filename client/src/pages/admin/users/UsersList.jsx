import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/admin/AdminLayout';
import DataTable from '../../../components/admin/DataTable';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ConfirmDialog from '../../../components/admin/ConfirmDialog';
import { users } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';

const UsersList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, user: null });
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await users.getAll();
      setData(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (user) => (
        <div className="flex items-center">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-8 h-8 rounded-full mr-3"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <i className="ri-user-line text-gray-500"></i>
            </div>
          )}
          <div>
            <div className="font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      label: 'Role',
      render: (user) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          user.role === 'superadmin' 
            ? 'bg-purple-100 text-purple-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {user.role}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (user) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          user.status === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {user.status}
        </span>
      )
    },
    {
      key: 'lastLogin',
      label: 'Last Login',
      render: (user) => user.lastLogin 
        ? new Date(user.lastLogin).toLocaleDateString()
        : 'Never'
    }
  ];

  const handleEdit = (user) => {
    navigate(`/admin/users/edit/${user._id}`);
  };

  const handleDelete = async (user) => {
    // Prevent deleting yourself
    if (user._id === currentUser.id) {
      toast.error("You cannot delete your own account");
      return;
    }

    // Prevent non-superadmins from deleting users
    if (currentUser.role !== 'superadmin') {
      toast.error("Only superadmins can delete users");
      return;
    }

    setDeleteDialog({ open: true, user });
  };

  const confirmDelete = async () => {
    try {
      await users.delete(deleteDialog.user._id);
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to delete user');
    } finally {
      setDeleteDialog({ open: false, user: null });
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-gray-600 mt-1">Manage administrator accounts</p>
        </div>
        {currentUser.role === 'superadmin' && (
          <button
            onClick={() => navigate('/admin/users/new')}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
          >
            <i className="ri-user-add-line"></i>
            Add New User
          </button>
        )}
      </div>

      {loading ? (
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

      <ConfirmDialog
        isOpen={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, user: null })}
        onConfirm={confirmDelete}
        title="Delete User"
        message={`Are you sure you want to delete ${deleteDialog.user?.name}? This action cannot be undone.`}
        type="danger"
      />
    </AdminLayout>
  );
};

export default UsersList; 