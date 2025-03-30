import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/admin/AdminLayout';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { gallery } from '../../../services/api';
import GalleryGrid from '../../../components/GalleryGrid';
import EmptyState from '../../../components/EmptyState';
import { Link } from 'react-router-dom';
import ImageActions from '../../../components/gallery/ImageActions';

const GalleryList = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [albumsLoading, setAlbumsLoading] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchImages();
    fetchAlbums();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await gallery.getAll();
      setImages(response.data.data);
    } catch (error) {
      console.error('Error fetching images:', error);
      toast.error('Failed to fetch images');
    } finally {
      setLoading(false);
    }
  };

  const fetchAlbums = async () => {
    setAlbumsLoading(true);
    try {
      const response = await gallery.getAlbums();
      setAlbums(response.data.data || []);
    } catch (error) {
      console.error('Error fetching albums:', error);
      setAlbums([]);
    } finally {
      setAlbumsLoading(false);
    }
  };

  const handleDelete = async (image) => {
    try {
      const confirmed = window.confirm(
        `Are you sure you want to delete "${image.title}"?`
      );
      
      if (confirmed) {
        await gallery.delete(image._id);
        toast.success('Image deleted successfully');
        fetchImages();
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image');
    }
  };

  const handleDeleteImage = (imageId) => {
    setImages((prev) => prev.filter((image) => image._id !== imageId));
  };

  const handleUpdateImage = (updatedImage) => {
    setImages((prev) => 
      prev.map((image) => 
        image._id === updatedImage._id ? updatedImage : image
      )
    );
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gallery</h1>
          <div className="flex space-x-4">
            <Link to="/admin/gallery/bulk-upload" className="btn-secondary">
              <i className="ri-upload-2-line mr-2"></i>
              Bulk Upload
            </Link>
            <Link to="/admin/gallery/new" className="btn-primary">
              <i className="ri-add-line mr-2"></i>
              Add Image
            </Link>
          </div>
        </div>

        {images.length === 0 ? (
          <EmptyState
            title="No Images Yet"
            message="Start by adding some images to your gallery."
            icon="ri-image-add-line"
            action={
              <Link
                to="/admin/gallery/new"
                className="btn-primary"
              >
                Add First Image
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div key={image._id} className="border rounded-lg overflow-hidden relative group">
                <div className="h-48 bg-gray-100 relative">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                  <ImageActions 
                    image={image} 
                    onDelete={handleDeleteImage} 
                    onUpdate={handleUpdateImage} 
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{image.title}</h3>
                  <p className="text-sm text-gray-500">
                    {image.album ? `Album: ${image.album.name}` : 'No album'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default GalleryList; 