import { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import EmptyState from '../components/EmptyState';
// import { gallery as galleryApi } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Gallery = () => {
  const [selectedAlbum, setSelectedAlbum] = useState('all');
  const [images, setImages] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryData();
  }, []);

  const fetchGalleryData = async () => {
    setLoading(true);
    try {
      // Fetch published images
      const imagesResponse = await galleryApi.getPublished();
      const fetchedImages = imagesResponse.data.data || [];
      
      // Fetch albums
      const albumsResponse = await galleryApi.getAlbums();
      const fetchedAlbums = albumsResponse.data.data || [];
      
      setImages(fetchedImages);
      setAlbums(fetchedAlbums);
      
      console.log('Fetched albums:', fetchedAlbums);
      console.log('Fetched images:', fetchedImages);
    } catch (error) {
      console.error('Error fetching gallery data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedAlbum !== 'all') {
      fetchAlbumImages(selectedAlbum);
    } else {
      // If "all" is selected, show all published images
      fetchAllPublishedImages();
    }
  }, [selectedAlbum]);

  const fetchAllPublishedImages = async () => {
    setLoading(true);
    try {
      const response = await galleryApi.getPublished();
      setImages(response.data.data || []);
    } catch (error) {
      console.error('Error fetching published images:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAlbumImages = async (albumId) => {
    setLoading(true);
    try {
      const response = await galleryApi.getByAlbum(albumId);
      setImages(response.data.data || []);
    } catch (error) {
      console.error('Error fetching album images:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter images based on selected album
  const filteredImages = selectedAlbum === 'all' 
    ? images 
    : images.filter(img => img.album?._id === selectedAlbum);

  return (
    <>
      <TopBar />
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Banner */}
        <header className="h-[60vh] relative">
          <img
            src="https://res.cloudinary.com/djvolnu9s/image/upload/v1743200742/posts/vpavkweerj5tmzhfvmsr.jpg"
            alt="ICHAD Gallery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Gallery</h1>
              <p className="text-xl md:text-2xl">Moments of Impact and Transformation</p>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          {loading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {/* Album Filter */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <button
                  key="all"
                  onClick={() => setSelectedAlbum('all')}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    selectedAlbum === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  All Photos
                </button>
                
                {albums.map(album => (
                  <button
                    key={album._id}
                    onClick={() => setSelectedAlbum(album._id)}
                    className={`px-6 py-2 rounded-full transition-all duration-300 ${
                      selectedAlbum === album._id
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {album.name}
                  </button>
                ))}
              </div>

              {/* Gallery Grid */}
              {filteredImages.length === 0 ? (
                <EmptyState
                  title={`Empty Album`}
                  message={`No images have been added to this album yet.`}
                  icon="ri-image-line"
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredImages.map((image) => (
                    <div
                      key={image._id}
                      className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative h-64 lg:h-72">
                        <img
                          src={image.url}
                          alt={image.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                          <h3 className="text-white text-lg font-semibold mb-2">
                            {image.title}
                          </h3>
                          <p className="text-white/80 text-sm">
                            {new Date(image.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default Gallery; 