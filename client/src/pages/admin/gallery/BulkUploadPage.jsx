import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/admin/AdminLayout';
import BulkUpload from '../../../components/gallery/BulkUpload';
import BatchEditor from '../../../components/gallery/BatchEditor';
import { gallery } from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const BulkUploadPage = () => {
  const [step, setStep] = useState(1); // 1 = upload, 2 = edit
  const [uploadedImages, setUploadedImages] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchAlbums();
  }, []);
  
  const fetchAlbums = async () => {
    try {
      const response = await gallery.getAlbums();
      setAlbums(response.data.data || []);
    } catch (error) {
      console.error('Error fetching albums:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleUploadComplete = (images) => {
    setUploadedImages(images);
    setStep(2);
  };
  
  const handleEditComplete = () => {
    navigate('/admin/gallery');
  };
  
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Bulk Upload Images</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {step === 1 && (
                <BulkUpload onComplete={handleUploadComplete} />
              )}
              
              {step === 2 && (
                <>
                  <h2 className="text-xl font-semibold mb-4">Edit Image Details</h2>
                  <BatchEditor 
                    images={uploadedImages} 
                    albums={albums}
                    onComplete={handleEditComplete} 
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default BulkUploadPage; 