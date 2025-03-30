import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/admin/AdminLayout';
import GalleryForm from './GalleryForm';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { gallery } from '../../../services/api';

const EditGallery = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImage();
  }, [id]);

  const fetchImage = async () => {
    try {
      const response = await gallery.getOne(id);
      setImage(response.data.data);
    } catch (error) {
      console.error('Error fetching image:', error);
      toast.error('Failed to fetch image');
      navigate('/admin/gallery');
    } finally {
      setLoading(false);
    }
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Image</h1>
        <p className="text-gray-600 mt-1">Update image details</p>
      </div>
      <GalleryForm image={image} />
    </AdminLayout>
  );
};

export default EditGallery; 