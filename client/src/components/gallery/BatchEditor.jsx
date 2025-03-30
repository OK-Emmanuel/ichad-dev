import { useState } from 'react';
import { toast } from 'react-toastify';
import { gallery } from '../../services/api';

const BatchEditor = ({ images, albums, onComplete }) => {
  const [editedImages, setEditedImages] = useState(images.map(img => ({
    ...img,
    newTitle: img.title,
    newAlbum: img.album?._id || '',
    newStatus: img.status
  })));
  
  const [loading, setLoading] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  
  const handleTitleChange = (id, value) => {
    setEditedImages(prev => 
      prev.map(img => 
        img._id === id ? { ...img, newTitle: value } : img
      )
    );
  };
  
  const handleAlbumChange = (id, value) => {
    setEditedImages(prev => 
      prev.map(img => 
        img._id === id ? { ...img, newAlbum: value } : img
      )
    );
  };
  
  const handleStatusChange = (id, value) => {
    setEditedImages(prev => 
      prev.map(img => 
        img._id === id ? { ...img, newStatus: value } : img
      )
    );
  };
  
  const applyBulkAlbum = () => {
    if (!selectedAlbum) return;
    
    setEditedImages(prev => 
      prev.map(img => ({ ...img, newAlbum: selectedAlbum }))
    );
    
    toast.success('Album applied to all images');
  };
  
  const applyBulkStatus = () => {
    if (!selectedStatus) return;
    
    setEditedImages(prev => 
      prev.map(img => ({ ...img, newStatus: selectedStatus }))
    );
    
    toast.success('Status applied to all images');
  };
  
  const saveChanges = async () => {
    setLoading(true);
    
    try {
      const updatePromises = editedImages.map(img => {
        // Only update if something changed
        if (
          img.newTitle !== img.title || 
          img.newAlbum !== (img.album?._id || '') ||
          img.newStatus !== img.status
        ) {
          const data = new FormData();
          data.append('title', img.newTitle);
          
          // Handle empty album case properly
          if (img.newAlbum === '') {
            data.append('album', ''); // Send empty string to clear album
          } else if (img.newAlbum) {
            data.append('album', img.newAlbum);
          }
          
          data.append('status', img.newStatus);
          
          console.log(`Updating image ${img._id}:`, {
            title: img.newTitle,
            album: img.newAlbum,
            status: img.newStatus
          });
          
          return gallery.update(img._id, data)
            .catch(error => {
              console.error(`Error updating image ${img._id}:`, error);
              // Continue with other updates even if one fails
              return Promise.resolve({ error, imageId: img._id });
            });
        }
        return Promise.resolve();
      });
      
      const results = await Promise.all(updatePromises);
      
      // Check if any updates failed
      const failures = results.filter(result => result && result.error);
      
      if (failures.length > 0) {
        console.error(`${failures.length} updates failed:`, failures);
        toast.error(`Updated ${results.length - failures.length} images, but ${failures.length} failed`);
      } else {
        toast.success('All images updated successfully');
      }
      
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error('Error updating images:', error);
      toast.error('Failed to update some images');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Set Album for All
          </label>
          <select
            value={selectedAlbum}
            onChange={(e) => setSelectedAlbum(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          >
            <option value="">Select Album</option>
            <option value="">No Album</option>
            {albums.map(album => (
              <option key={album._id} value={album._id}>
                {album.name}
              </option>
            ))}
          </select>
        </div>
        
        <button
          type="button"
          onClick={applyBulkAlbum}
          disabled={!selectedAlbum && selectedAlbum !== ''}
          className="btn-secondary"
        >
          Apply to All
        </button>
        
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Set Status for All
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          >
            <option value="">Select Status</option>
            <option value="private">Private (Admin Only)</option>
            <option value="public">Public (Visible to Everyone)</option>
          </select>
        </div>
        
        <button
          type="button"
          onClick={applyBulkStatus}
          disabled={!selectedStatus}
          className="btn-secondary"
        >
          Apply to All
        </button>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Album
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {editedImages.map(img => (
              <tr key={img._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-16 w-16 rounded overflow-hidden">
                    <img 
                      src={img.url} 
                      alt={img.title}
                      className="h-full w-full object-cover" 
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    value={img.newTitle}
                    onChange={(e) => handleTitleChange(img._id, e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={img.newAlbum}
                    onChange={(e) => handleAlbumChange(img._id, e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  >
                    <option value="">No Album</option>
                    {albums.map(album => (
                      <option key={album._id} value={album._id}>
                        {album.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={img.newStatus}
                    onChange={(e) => handleStatusChange(img._id, e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  >
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-end">
        <button
          type="button"
          onClick={saveChanges}
          disabled={loading}
          className="btn-primary"
        >
          {loading ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
};

export default BatchEditor; 