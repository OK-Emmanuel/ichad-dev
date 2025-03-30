import { useState } from 'react';

const GalleryGrid = ({ images, onSelect, selectable = false }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const toggleSelect = (imageId) => {
    setSelectedImages(prev => {
      const newSelection = prev.includes(imageId)
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId];
      
      onSelect?.(newSelection);
      return newSelection;
    });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image) => (
        <div 
          key={image._id}
          className={`
            relative group cursor-pointer rounded-lg overflow-hidden
            ${selectable && selectedImages.includes(image._id) ? 'ring-2 ring-primary' : ''}
          `}
          onClick={() => selectable && toggleSelect(image._id)}
        >
          <div className="aspect-square">
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <h3 className="text-white text-sm font-medium truncate">
              {image.title}
            </h3>
            <p className="text-white/80 text-xs">
              {new Date(image.createdAt).toLocaleDateString()}
            </p>
          </div>
          {selectable && selectedImages.includes(image._id) && (
            <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
              <i className="ri-check-line"></i>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid; 