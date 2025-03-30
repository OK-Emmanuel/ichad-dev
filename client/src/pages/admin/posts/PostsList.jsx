import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/admin/AdminLayout';
import DataTable from '../../../components/admin/DataTable';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { posts } from '../../../services/api';

const PostsList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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
          {item.excerpt && (
            <div className="text-sm text-gray-500 truncate">
              {item.excerpt.length > 30 
                ? `${item.excerpt.substring(0, 30)}...` 
                : item.excerpt}
            </div>
          )}
        </div>
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
      key: 'publishedAt', 
      label: 'Published Date',
      render: (item) => (
        <div>
          {item.publishedAt ? (
            <>
              <div>{new Date(item.publishedAt).toLocaleDateString()}</div>
              <div className="text-xs text-gray-500">
                {new Date(item.publishedAt).toLocaleTimeString()}
              </div>
            </>
          ) : (
            <span className="text-gray-500">-</span>
          )}
        </div>
      )
    },
    { 
      key: 'author', 
      label: 'Author',
      render: (item) => (
        <div className="flex items-center gap-2">
          {item.author?.avatar ? (
            <img 
              src={item.author.avatar} 
              alt={item.author.name}
              className="w-6 h-6 rounded-full"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
              <i className="ri-user-line text-gray-500"></i>
            </div>
          )}
          <span>{item.author?.name || '-'}</span>
        </div>
      )
    }
  ];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await posts.getAll();
      console.log('Posts response:', response); // Debug log
      // Make sure we're accessing the data correctly from the response
      setData(response.data?.data || []);
    } catch (error) {
      console.error('Error fetching posts:', error); // Debug log
      setError('Failed to fetch posts');
      toast.error('Failed to fetch posts');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post) => {
    navigate(`/admin/posts/edit/${post._id}`);
  };

  const handleDelete = async (post) => {
    try {
      const confirmed = window.confirm(
        `Are you sure you want to delete "${post.title}"? This action cannot be undone.`
      );
      
      if (confirmed) {
        const response = await posts.delete(post._id);
        
        if (response.data.success) {
          toast.success('Post deleted successfully');
          fetchPosts(); // Refresh the list
        } else {
          throw new Error(response.data.message || 'Failed to delete post');
        }
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error(error.response?.data?.message || 'Failed to delete post. Please try again.');
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Posts</h1>
          <p className="text-gray-600 mt-1">Manage your blog posts</p>
        </div>
        <button
          onClick={() => navigate('/admin/posts/new')}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
        >
          <i className="ri-add-line"></i>
          New Post
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

export default PostsList; 