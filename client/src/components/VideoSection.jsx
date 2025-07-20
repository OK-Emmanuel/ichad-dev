import { useState, useEffect } from 'react';

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Default video data as fallback
  const defaultVideoData = {
    thumbnailImage: "https://res.cloudinary.com/djvolnu9s/image/upload/v1743186602/posts/yquz4cxqqhnnhohufm4u.jpg",
    videoUrl: "https://www.youtube.com/embed/6UowxM22APM?si=HLicU1WM01cUHIKm",
    title: "ICHAD Project Video",
    alt: "ICHAD Project Video"
  };

  useEffect(() => {
    fetchVideoContent();
  }, []);

  const fetchVideoContent = async () => {
    try {
      const response = await fetch('/api/about-content/video_section');
      if (response.ok) {
        const data = await response.json();
        setVideoData(data);
      }
    } catch (error) {
      console.error('Error fetching video content:', error);
    } finally {
      setLoading(false);
    }
  };

  // Use dynamic data if available, otherwise use defaults
  const videoConfig = videoData?.data || defaultVideoData;
  const thumbnailImage = videoConfig.thumbnailImage || videoData?.image || defaultVideoData.thumbnailImage;
  const videoUrl = videoConfig.videoUrl || defaultVideoData.videoUrl;
  const videoTitle = videoConfig.title || videoData?.title || defaultVideoData.title;
  const videoAlt = videoConfig.alt || videoData?.content || defaultVideoData.alt;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative h-[500px] rounded-xl overflow-hidden">
          {/* Video thumbnail when not playing */}
          {!isPlaying && (
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-black/50"></div>
              <img 
                src={thumbnailImage} 
                alt={videoAlt} 
                className="w-full h-full object-cover"
              />
              {/* Play button */}
              <button 
                onClick={() => setIsPlaying(true)}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                         bg-white/25 hover:bg-white/40 transition-all duration-300
                         w-20 h-20 rounded-full flex items-center justify-center"
              >
                <svg 
                  className="w-12 h-12 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          )}
          
          {/* Actual video when playing */}
          {isPlaying && (
            <iframe
              className="w-full h-full"
              src={videoUrl}
              title={videoTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoSection; 