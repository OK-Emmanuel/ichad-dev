import { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import GalleryForm from './GalleryForm';

const NewGallery = () => {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Upload New Image</h1>
        <p className="text-gray-600 mt-1">Add a new image to the gallery</p>
      </div>
      <GalleryForm />
    </AdminLayout>
  );
};

export default NewGallery; 