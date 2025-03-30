import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { posts } from '../../../services/api';

const PostForm = ({ post = null }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    excerpt: post?.excerpt || '',
    category: post?.category || '',
    status: post?.status || 'draft',
    tags: post?.tags?.join(', ') || '',
    featuredImage: null
  });
  const [preview, setPreview] = useState(post?.featuredImage || null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'featuredImage' && files?.length) {
      setFormData(prev => ({
        ...prev,
        featuredImage: files[0]
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
    setLoading(true);

    try {
      // Create FormData object for multipart/form-data
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'tags') {
          // Convert tags string to array
          const tags = formData[key].split(',').map(tag => tag.trim()).filter(Boolean);
          tags.forEach(tag => data.append('tags[]', tag));
        } else if (key === 'featuredImage' && formData[key]) {
          data.append('featuredImage', formData[key]);
        } else if (formData[key]) {
          data.append(key, formData[key]);
        }
      });

      if (post) {
        await posts.update(post._id, data);
        toast.success('Post updated successfully');
      } else {
        await posts.create(data);
        toast.success('Post created successfully');
      }
      navigate('/admin/posts');
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error(error.response?.data?.message || 'Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white rounded-lg shadow-md">
        {/* Main Content Section */}
        <div className="p-6 space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter post title"
            />
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Featured Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image
              </label>
              <div className="space-y-4">
                {preview ? (
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreview(null);
                        setFormData(prev => ({ ...prev, featuredImage: null }));
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <input
                      type="file"
                      name="featuredImage"
                      onChange={handleChange}
                      accept="image/*"
                      className="hidden"
                      id="featuredImage"
                    />
                    <label
                      htmlFor="featuredImage"
                      className="flex flex-col items-center justify-center h-40 cursor-pointer"
                    >
                      <i className="ri-image-add-line text-4xl text-gray-400"></i>
                      <span className="mt-2 text-sm text-gray-500">
                        Click to upload image
                      </span>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Meta Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., News, Events"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="news, update, announcement"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={10}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Write your post content here..."
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Brief summary of your post..."
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t rounded-b-lg flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/posts')}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
                {post ? 'Update Post' : 'Create Post'}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostForm; 