import { useState } from 'react';
import { imageGuidelines } from '../utils/imageGuidelines';

export const ImageUpload = ({ type, onChange, preview = null }) => {
  const [imagePreview, setImagePreview] = useState(preview);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        onChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {type === 'album' ? 'Album Cover' : 'Image'}
      </label>
      <div className="flex items-center gap-4">
        {imagePreview && (
          <div className="w-20 h-20 rounded-lg overflow-hidden">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-primary file:text-white
              hover:file:bg-primary-dark"
          />
        </div>
      </div>
      <p className="text-sm text-gray-500">
        {imageGuidelines[type]?.description || 'No description available'}
      </p>
    </div>
  );
}; 