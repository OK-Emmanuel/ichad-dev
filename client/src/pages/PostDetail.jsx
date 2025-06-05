import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { postService } from '../services/api';
import { optimizeImageUrl } from '../utils/imageOptimizer';
import tempImage from '../assets/team/template.jpg';

const PostDetail = () => {
  const { postSlug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        
        const postData = await postService.getPostBySlug(postSlug);
        
        // Process the post data
        setPost({
          _id: postData._id,
          title: postData.title || '',
          content: postData.content || '',
          summary: postData.summary || '',
          coverImage: postData.coverImage || '',
          createdAt: postData.createdAt,
          updatedAt: postData.updatedAt,
          slug: postData.slug || '',
          tags: postData.tags || [],
          visibility: postData.visibility || 'public'
        });
        
        setNotFound(false);
      } catch (err) {
        console.error("Error fetching post:", err);
        setNotFound(true);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);

  if (loading) {
    return (
      <>
        <TopBar />
        <Navbar />
        <main>
          <div className="container mx-auto px-4 py-12">
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          </div>
        </main>
        <Footer />
        <BackToTop />
      </>
    );
  }

  if (notFound) {
    return (
      <>
        <TopBar />
        <Navbar />
        <main>
          <div className="container mx-auto px-4 py-12">
            <div className="text-center py-12">
              <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
              <p className="mb-6">The post you're looking for doesn't exist or has been removed.</p>
              <button 
                onClick={() => navigate('/posts')}
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
                Back to Posts
              </button>
            </div>
          </div>
        </main>
        <Footer />
        <BackToTop />
      </>
    );
  }

  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        {/* Hero Section */}
        {post && (
          <section className="relative py-16 md:py-20 bg-primary">
            <div className="absolute inset-0 bg-[url('/src/assets/patterns/pattern-1.png')] opacity-50"></div>
            <div className="container relative mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  {post.title}
                </h1>
                <p className="text-xl text-white/90 mt-4">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Main Content Area */}
        <div className="container mx-auto px-4 py-12">
          {post && (
            <div className="max-w-4xl mx-auto -mt-16 md:-mt-20 relative z-10">
              <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8">
                {/* Back Button */}
                <button
                  onClick={() => navigate('/posts')}
                  className="mb-6 flex items-center text-primary hover:text-primary-dark transition-colors"
                >
                  <FaArrowLeft className="mr-2" />
                  Back to Posts
                </button>

                {/* Cover Image */}
                {post.coverImage && (
                  <div className="mb-8 h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg shadow-md">
                    <img
                      src={optimizeImageUrl(post.coverImage)}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = tempImage;
                      }}
                    />
                  </div>
                )}

                {/* Summary */}
                {post.summary && (
                  <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                    <p className="text-lg text-gray-700 italic">{post.summary}</p>
                  </div>
                )}

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Content */}
                <div className="prose max-w-none">
                  {post.content && (
                    <div 
                      dangerouslySetInnerHTML={{ __html: post.content }}
                      className="text-gray-700 leading-relaxed"
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default PostDetail; 