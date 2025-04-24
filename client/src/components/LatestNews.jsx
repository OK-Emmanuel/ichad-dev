import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updates } from '../services/updates';
import LoadingSpinner from './LoadingSpinner';

const LatestNews = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLatestPosts();
  }, []);

  const fetchLatestPosts = async () => {
    try {
      setLoading(true);
      const response = await updates.getAll();
      
      // Filter for posts only, take the first 3, and process the data
      const latestPosts = response.data
        .filter(update => update.type === 'post')
        .slice(0, 3)
        .map(post => ({
          ...post,
          coverImage: post.coverImage?.data?.attributes,
          publishedAt: post.publishedAt
        }));
      
      setPosts(latestPosts);
    } catch (error) {
      console.error('Error fetching latest posts:', error);
      setError('Failed to load latest news');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Latest News</h2>
          <Link to="/updates?type=post" className="text-primary hover:text-primary-dark">
            View All News →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <LoadingSpinner />
        </div>
      </div>
    </section>
  );

  if (error) return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Latest News</h2>
          <Link to="/updates?type=post" className="text-primary hover:text-primary-dark">
            View All News →
          </Link>
        </div>
        <div className="text-red-500 text-center">{error}</div>
      </div>
    </section>
  );

  if (posts.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Latest News</h2>
          <Link to="/updates?type=post" className="text-primary hover:text-primary-dark">
            View All News →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map(post => (
            <article key={post.id} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                {post.coverImage?.url ? (
                  <img 
                    src={post.coverImage.url} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <i className="ri-image-line text-4xl text-gray-400"></i>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <time dateTime={post.publishedAt} className="flex items-center gap-1">
                    <i className="ri-calendar-line"></i>
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </time>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  <Link to={`/updates/${post.slug}?type=post`}>
                    {post.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                {post.description && (
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.description.length > 150 
                      ? `${post.description.substring(0, 150)}...` 
                      : post.description}
                  </p>
                )}

                {/* Read More Link */}
                <Link 
                  to={`/updates/${post.slug}?type=post`}
                  className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                >
                  Read More
                  <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews; 