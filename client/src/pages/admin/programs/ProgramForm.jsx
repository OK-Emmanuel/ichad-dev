import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { programs } from '../../../services/api';

const ProgramForm = ({ program = null }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: program?.title || '',
    description: program?.description || '',
    status: program?.status || 'draft',
    featuredImage: null
  });
  const [preview, setPreview] = useState(program?.featuredImage || null);

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
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'featuredImage' && formData[key]) {
          data.append('featuredImage', formData[key]);
        } else if (formData[key]) {
          data.append(key, formData[key]);
        }
      });

      if (program) {
        await programs.update(program._id, data);
        toast.success('Program updated successfully');
      } else {
        await programs.create(data);
        toast.success('Program created successfully');
      }
      navigate('/admin/programs');
    } catch (error) {
      console.error('Error saving program:', error);
      toast.error(error.response?.data?.message || 'Failed to save program');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white rounded-lg shadow-md">
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
              placeholder="Enter program title"
            />
          </div>

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

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Write your program description here..."
            />
          </div>

          {/* Status */}
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

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t rounded-b-lg flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/programs')}
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
                {program ? 'Update Program' : 'Create Program'}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProgramForm; 