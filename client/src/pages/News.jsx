import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await posts.getAll();
      const allPosts = response.data?.data || [];
      const publishedPosts = allPosts.filter(post => post.status === 'published');
      setNews(publishedPosts);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to load news');
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
              Latest News & Updates
            </h1>
            <p className="text-lg text-white/80">
              Stay informed about our latest initiatives, programs, and community impact
            </p>
          </div>
        </div>
      </section>

      {/* News Grid Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {news.length === 0 ? (
            <div className="text-center text-gray-500">No published news articles yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map(post => (
                <article 
                  key={post._id} 
                  className="group bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative h-60 overflow-hidden">
                    {post.featuredImage ? (
                      <img 
                        src={post.featuredImage} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <i className="ri-image-line text-4xl text-gray-400"></i>
                      </div>
                    )}
                    {/* Category Tag */}
                    {post.category && (
                      <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                        {post.category}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-2">
                        {post.author?.avatar ? (
                          <img 
                            src={post.author.avatar} 
                            alt={post.author.name}
                            className="w-6 h-6 rounded-full"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                            <i className="ri-user-line text-gray-500"></i>
                          </div>
                        )}
                        <span>{post.author?.name}</span>
                      </div>
                      <time dateTime={post.publishedAt} className="flex items-center gap-1">
                        <i className="ri-calendar-line"></i>
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </time>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      <Link to={`/news/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {post.excerpt.length > 150 
                          ? `${post.excerpt.substring(0, 150)}...` 
                          : post.excerpt}
                      </p>
                    )}

                    {/* Tags */}
                    {post.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.map(tag => (
                          <span 
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Read More Link */}
                    <Link 
                      to={`/news/${post.slug}`}
                      className="inline-flex items-center gap-2 text-primary font-medium mt-4 hover:gap-3 transition-all"
                    >
                      Read More 
                      <i className="ri-arrow-right-line"></i>
                    </Link>
                  </div>
                </article>
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

export default News;