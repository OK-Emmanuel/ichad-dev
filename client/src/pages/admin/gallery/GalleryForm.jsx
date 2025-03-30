import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { gallery } from '../../../services/api';

const GalleryForm = ({ image = null }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [formData, setFormData] = useState({
    title: image?.title || '',
    album: image?.album?._id || '',
    status: image?.status || 'public',
    image: null
  });
  const [preview, setPreview] = useState(image?.url || null);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await gallery.getAlbums();
      const albumsData = response.data.data || [];
      setAlbums(albumsData);
      
      // If we have albums and this is a new image (not editing), 
      // set the default album to "All Photos" if it exists
      if (albumsData.length > 0 && !image) {
        const allPhotosAlbum = albumsData.find(album => album.name === "All Photos");
        if (allPhotosAlbum) {
          setFormData(prev => ({
            ...prev,
            album: allPhotosAlbum._id
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files?.length) {
      setFormData(prev => ({
        ...prev,
        image: files[0]
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
      data.append('title', formData.title);
      
      // Handle album field - send empty string if no album selected
      if (formData.album) {
        data.append('album', formData.album);
      }
      
      // Always include status
      data.append('status', formData.status);
      console.log('Submitting with status:', formData.status);
      
      // Only append image if we're creating a new image or if the user selected a new image
      if (!image && !formData.image) {
        throw new Error('No image selected');
      }
      
      if (formData.image) {
        data.append('image', formData.image);
      }

      if (image) {
        const response = await gallery.update(image._id, data);
        console.log('Update response:', response.data);
        toast.success('Image updated successfully');
      } else {
        const response = await gallery.create(data);
        console.log('Create response:', response.data);
        toast.success('Image uploaded successfully');
      }
      navigate('/admin/gallery');
    } catch (error) {
      console.error('Error saving image:', error);
      const errorMessage = error.response?.data?.message || 
                           error.response?.data?.errors?.[0]?.msg ||
                           error.message ||
                           'Failed to save image';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          required
        />
      </div>

      {albums.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Album
          </label>
          <select
            name="album"
            value={formData.album}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          >
            <option value="">No Album</option>
            {albums.map(album => (
              <option key={album._id} value={album._id}>
                {album.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Visibility
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        >
          <option value="private">Private (Admin Only)</option>
          <option value="public">Public (Visible to Everyone)</option>
        </select>
      </div>

      {/* Only show file input if creating a new image */}
      {!image && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-primary file:text-white
              hover:file:bg-primary-dark"
            required
          />
        </div>
      )}

      {/* Always show preview if available */}
      {preview && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image Preview
          </label>
          <div className="w-64 h-64 rounded-lg overflow-hidden border border-gray-200">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Option to replace image when editing */}
      {image && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Replace Image (Optional)
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-primary file:text-white
              hover:file:bg-primary-dark"
          />
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
        >
          {loading ? 'Saving...' : 'Save Image'}
        </button>
      </div>
    </form>
  );
};

export default GalleryForm; 