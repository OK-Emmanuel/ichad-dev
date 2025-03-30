import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { gallery } from '../../services/api';
import LoadingSpinner from '../LoadingSpinner';

const BulkUpload = ({ onComplete }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  
  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type.startsWith('image/')
    );
    setFiles(prev => [...prev, ...droppedFiles]);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error('Please select at least one image');
      return;
    }
    
    setUploading(true);
    setProgress(0);
    
    const uploadedImages = [];
    const totalFiles = files.length;
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = file.name.split('.')[0]; // Use filename as initial title
        
        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', fileName); // Use filename as initial title
        formData.append('status', 'private'); // Default to private for bulk uploads
        
        const response = await gallery.create(formData);
        uploadedImages.push(response.data.data);
        
        // Update progress
        setProgress(Math.round(((i + 1) / totalFiles) * 100));
      }
      
      toast.success(`Successfully uploaded ${uploadedImages.length} images`);
      
      if (onComplete) {
        onComplete(uploadedImages);
      }
      
      // Reset state
      setFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Bulk upload error:', error);
      toast.error('Error uploading images');
    } finally {
      setUploading(false);
    }
  };
  
  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  return (
    <div className="space-y-6">
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          multiple 
          accept="image/*" 
          onChange={handleFileSelect} 
          className="hidden" 
        />
        <div className="flex flex-col items-center justify-center">
          <i className="ri-upload-cloud-2-line text-4xl text-gray-400 mb-2"></i>
          <p className="text-gray-600">
            Drag and drop images here, or click to select files
          </p>
          <p className="text-sm text-gray-500 mt-1">
            You can upload multiple images at once
          </p>
        </div>
      </div>
      
      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">Selected Files ({files.length})</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {files.map((file, index) => (
              <div key={index} className="relative group">
                <div className="h-32 rounded-lg overflow-hidden border">
                  <img 
                    src={URL.createObjectURL(file)} 
                    alt={file.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <i className="ri-close-line"></i>
                </button>
                <p className="text-xs text-gray-500 truncate mt-1">{file.name}</p>
              </div>
            ))}
          </div>
          
          {uploading ? (
            <div className="space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 text-center">
                Uploading {progress}% ({Math.round((progress / 100) * files.length)}/{files.length})
              </p>
            </div>
          ) : (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleUpload}
                className="btn-primary"
                disabled={uploading}
              >
                Upload {files.length} Images
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BulkUpload; 