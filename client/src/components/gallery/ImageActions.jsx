import { useState } from 'react';
import { toast } from 'react-toastify';
import { gallery } from '../../services/api';
import { Link } from 'react-router-dom';

const ImageActions = ({ image, onDelete, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(image.title);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this image?')) {
      return;
    }
    
    setLoading(true);
    try {
      await gallery.delete(image._id);
      toast.success('Image deleted successfully');
      if (onDelete) onDelete(image._id);
    } catch (error) {
      toast.error('Failed to delete image');
      console.error('Delete error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleRename = async () => {
    if (renaming) {
      if (newTitle.trim() === '') {
        toast.error('Title cannot be empty');
        return;
      }
      
      setLoading(true);
      try {
        const data = new FormData();
        data.append('title', newTitle);
        const response = await gallery.update(image._id, data);
        toast.success('Image renamed successfully');
        if (onUpdate) onUpdate(response.data.data);
        setRenaming(false);
      } catch (error) {
        toast.error('Failed to rename image');
        console.error('Rename error:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setRenaming(true);
    }
  };
  
  const handleCancelRename = () => {
    setNewTitle(image.title);
    setRenaming(false);
  };
  
  if (renaming) {
    return (
      <div className="flex items-center space-x-2 w-full">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border rounded px-2 py-1 text-sm w-full"
          disabled={loading}
        />
        <button
          onClick={handleRename}
          disabled={loading}
          className="p-1 text-green-600 hover:text-green-800 disabled:opacity-50"
          title="Save"
        >
          <i className="ri-check-line text-lg"></i>
        </button>
        <button
          onClick={handleCancelRename}
          disabled={loading}
          className="p-1 text-gray-600 hover:text-gray-800 disabled:opacity-50"
          title="Cancel"
        >
          <i className="ri-close-line text-lg"></i>
        </button>
      </div>
    );
  }
  
  return (
    <div className="absolute top-2 right-2 flex space-x-1 bg-black bg-opacity-50 rounded-md p-1">
      <button
        onClick={handleRename}
        disabled={loading}
        className="p-1 text-white hover:text-blue-200 disabled:opacity-50"
        title="Rename"
      >
        <i className="ri-edit-line text-lg"></i>
      </button>
      <Link
        to={`/admin/gallery/edit/${image._id}`}
        className="p-1 text-white hover:text-green-200"
        title="Edit Details"
      >
        <i className="ri-settings-line text-lg"></i>
      </Link>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="p-1 text-white hover:text-red-200 disabled:opacity-50"
        title="Delete"
      >
        {loading ? <i className="ri-loader-line animate-spin text-lg"></i> : <i className="ri-delete-bin-line text-lg"></i>}
      </button>
    </div>
  );
};

export default ImageActions; 