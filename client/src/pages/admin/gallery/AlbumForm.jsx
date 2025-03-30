import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { gallery } from '../../../services/api';
import AdminLayout from '../../../components/admin/AdminLayout';
import AlbumForm from '../../../components/AlbumForm';
import { ImageUpload } from '../../../components/ImageUpload';

const AlbumCreate = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await gallery.createAlbum(data);
      toast.success('Album created successfully');
      navigate('/admin/gallery');
    } catch (error) {
      console.error('Error creating album:', error);
      toast.error('Failed to create album');
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Album</h1>
        <AlbumForm onSubmit={handleSubmit} />
      </div>
    </AdminLayout>
  );
};

export default AlbumCreate; 