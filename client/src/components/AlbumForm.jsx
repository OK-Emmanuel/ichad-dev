import { useState } from 'react';
import { ImageUpload } from './ImageUpload';

const AlbumForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    coverImage: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Album Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          rows={3}
        />
      </div>

      <ImageUpload
        type="album"
        onChange={(file) => setFormData(prev => ({ ...prev, coverImage: file }))}
        preview={initialData?.coverImage}
      />

      <div className="flex justify-end gap-4">
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
        >
          {initialData ? 'Update Album' : 'Create Album'}
        </button>
      </div>
    </form>
  );
};

export default AlbumForm; 