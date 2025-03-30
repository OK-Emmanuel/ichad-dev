import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext';
import { users } from '../../../services/api';
import FileUpload from '../../../components/FileUpload';

const UserForm = ({ user = null }) => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    confirmPassword: '',
    role: user?.role || 'admin',
    status: user?.status || 'active',
    avatar: null
  });
  const [preview, setPreview] = useState(user?.avatar || null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar' && files?.length) {
      setFormData(prev => ({
        ...prev,
        avatar: files[0]
      }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validations
    if (!formData.name || !formData.email) {
      toast.error('Name and email are required');
      return;
    }

    if (!user && (!formData.password || formData.password.length < 6)) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (!user && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Only superadmin can change roles
    if (user && formData.role !== user.role && currentUser.role !== 'superadmin') {
      toast.error('Only superadmins can change user roles');
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      if (formData.password) {
        data.append('password', formData.password);
      }
      data.append('role', formData.role);
      data.append('status', formData.status);
      if (formData.avatar) {
        data.append('avatar', formData.avatar);
      }

      if (user) {
        await users.update(user._id, data);
        toast.success('User updated successfully');
      } else {
        await users.create(data);
        toast.success('User created successfully');
      }
      navigate('/admin/users');
    } catch (error) {
      console.error('Error saving user:', error);
      toast.error(error.response?.data?.message || 'Failed to save user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="space-y-6 bg-white p-6 rounded-lg shadow">
        {/* Avatar Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Picture
          </label>
          <div className="flex items-center space-x-6">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                <i className="ri-user-line text-3xl text-gray-400"></i>
              </div>
            )}
            <FileUpload
              onFileSelect={(file) => handleChange({ 
                target: { name: 'avatar', files: [file] } 
              })}
              accept="image/*"
            />
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />
        </div>

        {/* Password fields (only show for new users or password reset) */}
        {!user && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                required={!user}
                minLength={6}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                required={!user}
                minLength={6}
              />
            </div>
          </>
        )}

        {/* Role (only shown for superadmin) */}
        {currentUser.role === 'superadmin' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>
        )}

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/users')}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <i className="ri-loader-4-line animate-spin"></i>
                Saving...
              </>
            ) : (
              <>
                <i className="ri-save-line"></i>
                {user ? 'Update User' : 'Create User'}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserForm; 