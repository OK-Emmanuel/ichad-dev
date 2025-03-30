import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { posts } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';

const NewsPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]); // For related posts

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await posts.getOne(slug);
      setPost(response.data.data);

      // Fetch related posts (posts with same category or tags)
      const allPosts = await posts.getAll();
      const related = allPosts.data.data
        .filter(p => 
          p._id !== response.data.data._id && // Not the current post
          p.status === 'published' && // Only published posts
          (
            p.category === response.data.data.category || // Same category
            p.tags?.some(tag => response.data.data.tags?.includes(tag)) // Common tags
          )
        )
        .slice(0, 2); // Only take 2 related posts
      setRelatedPosts(related);
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Failed to load post');
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

  if (error || !post) return (
    <>
      <TopBar />
      <Navbar />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">{error || 'Post not found'}</div>
          <Link to="/news" className="text-primary hover:underline">
            ← Back to News
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );

  return (
    <>
      <TopBar />
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Image */}
        <div className="w-full h-[60vh] relative">
          {post.featuredImage ? (
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <i className="ri-image-line text-6xl text-gray-400"></i>
            </div>
          )}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 max-w-[900px] -mt-20 relative z-10">
          <article className="bg-white rounded-lg shadow-xl p-8 mb-12">
            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                {post.author?.avatar ? (
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <i className="ri-user-line text-gray-500"></i>
                  </div>
                )}
                <span>By {post.author?.name}</span>
              </div>
              <time className="flex items-center" dateTime={post.publishedAt}>
                <i className="ri-calendar-line mr-2"></i>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              {post.category && (
                <span className="flex items-center">
                  <i className="ri-folder-line mr-2"></i>
                  {post.category}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              {post.title}
            </h1>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {post.content}
            </div>

            {/* Tags */}
            {post.tags?.length > 0 && (
              <div className="mt-12 pt-6 border-t">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map((related) => (
                  <Link 
                    key={related._id}
                    to={`/news/${related.slug}`}
                    className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      {related.featuredImage ? (
                        <img
                          src={related.featuredImage}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <i className="ri-image-line text-4xl text-gray-400"></i>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {related.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default NewsPost; 