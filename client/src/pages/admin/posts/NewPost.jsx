import AdminLayout from '../../../components/admin/AdminLayout';
import PostForm from './PostForm';

const NewPost = () => {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New Post</h1>
        <p className="text-gray-600 mt-1">Create a new blog post</p>
      </div>
      <PostForm />
    </AdminLayout>
  );
};

export default NewPost; 