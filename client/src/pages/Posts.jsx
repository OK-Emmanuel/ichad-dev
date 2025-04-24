import { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      const response = await axios.get('http://localhost:1337/api/posts?populate=*');
      
      console.log('Strapi Posts Response:', JSON.stringify(response.data, null, 2));
      
      // Process the data based on the actual response structure
      const processedPosts = response.data.data.map(post => {
        console.log('Processing post:', JSON.stringify(post, null, 2));
        return {
          id: post.id,
          title: post.title,
          summary: post.summary,
          content: post.content,
          slug: post.slug,
          coverImage: post.coverImage,
          publishedAt: post.publishedAt
        };
      });
      
      setPosts(processedPosts);
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
            <div className="text-center text-gray-500">No posts found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    {post.coverImage?.url ? (
                      <img 
                        src={post.coverImage.url} 
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
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
                      {new Date(post.publishedAt).toLocaleDateString()}
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