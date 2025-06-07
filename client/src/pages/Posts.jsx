import { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';
import { postService } from '../services/api';
import EmptyState from '../components/EmptyState';
import { optimizeImageUrl } from '../utils/imageOptimizer';
import tempImage from '../assets/team/template.jpg';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await postService.getPosts();
      
      // Process the posts data
      const processedPosts = data.map(post => ({
        _id: post._id,
        title: post.title || '',
        summary: post.summary || '',
        content: post.content || '',
        slug: post.slug || '',
        coverImage: post.coverImage || '',
        visibility: post.visibility || 'draft',
        tags: post.tags || [],
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
      }));
      
      // Only show public posts
      const publicPosts = processedPosts.filter(post => post.visibility === 'public');
      
      setPosts(publicPosts);
      setError(null);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <>
      <TopBar />
      <Navbar />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </main>
      <Footer />
      <BackToTop />
    </>
  );

  if (error) return (
    <>
      <TopBar />
      <Navbar />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 text-center">{error}</div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );

  return (
    <>
      <TopBar />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-primary">
        <div className="absolute inset-0 bg-[url('/src/assets/patterns/pattern-1.png')] opacity-50"></div>
        <div className="container relative mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              News & Updates
            </h1>
            <p className="text-lg text-white/80">
              Stay informed about our latest news and announcements
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {posts.length === 0 ? (
            <EmptyState 
              title="No Posts Available"
              message="We don't have any blog posts available at the moment. Please check back soon!"
              icon="ri-article-line"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <div key={post._id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Image Container */}
                  <div className="relative aspect-[3/2] overflow-hidden">
                    {post.coverImage ? (
                      <img 
                        src={optimizeImageUrl(post.coverImage)} 
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = tempImage;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <i className="ri-image-line text-4xl text-gray-400"></i>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <Link 
                      to={`/posts/${post.slug}`}
                      className="text-xl font-bold mb-3 hover:text-primary transition-colors block"
                    >
                      {post.title}
                    </Link>
                    {post.summary && (
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {post.summary}
                      </p>
                    )}
                    <div className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <BackToTop />
    </>
  );
};

export default Posts; 