import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/admin/AdminLayout';
import PostForm from './PostForm';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { posts } from '../../../services/api';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      // First get all posts to find the one with matching ID
      const response = await posts.getAll();
      const foundPost = response.data.data.find(p => p._id === id);
      
      if (!foundPost) {
        throw new Error('Post not found');
      }

      setPost(foundPost);
    } catch (error) {
      console.error('Error fetching post:', error);
      toast.error('Failed to fetch post');
      navigate('/admin/posts');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <AdminLayout>
      <div className="flex justify-center py-8">
        <LoadingSpinner />
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Post</h1>
        <p className="text-gray-600 mt-1">Update your blog post</p>
      </div>
      <PostForm post={post} />
    </AdminLayout>
  );
};

export default EditPost; 