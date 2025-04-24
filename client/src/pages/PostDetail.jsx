import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

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
        
        // Convert URL parameter back to original slug format
        const originalSlug = postSlug.split('-').join(' ');
        
        // Fetch post with populated related fields
        const strapiUrl = process.env.NODE_ENV === 'production'
          ? `/api/posts?filters[slug][$eqi]=${originalSlug}&populate=*`
          : `http://localhost:1337/api/posts?filters[slug][$eqi]=${originalSlug}&populate=*`;
        
        console.log("Fetching post from:", strapiUrl);
        
        const response = await fetch(strapiUrl);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("API Error Response:", errorData);
          setNotFound(true);
          setPost(null);
          return;
        }
        
        const data = await response.json();
        console.log("Post detail raw response:", data);
        
        // Verify the data structure
        if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
          setNotFound(true);
          setPost(null);
          return;
        }
        
        // Get the first post from the filtered results
        const postData = data.data[0];
        
        // Process the post data
        const processedPost = {
          id: postData.id,
          title: postData.title,
          content: postData.content,
          summary: postData.summary,
          coverImage: postData.coverImage,
          publishedAt: postData.publishedAt,
          slug: postData.slug
        };
        
        setPost(processedPost);
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
                  {new Date(post.publishedAt).toLocaleDateString()}
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
                {post.coverImage?.url && (
                  <div className="mb-8 h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg shadow-md">
                    <img
                      src={post.coverImage.url}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Summary */}
                {post.summary && (
                  <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                    <p className="text-lg text-gray-700 italic">{post.summary}</p>
                  </div>
                )}

                {/* Content */}
                <div className="prose max-w-none">
                  {post.content && (
                    <BlocksRenderer 
                      content={post.content}
                      blocks={{
                        paragraph: ({ children }) => (
                          <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>
                        ),
                        heading: ({ children, level }) => {
                          const Tag = `h${level}`;
                          const classes = {
                            1: 'text-4xl font-bold text-primary mb-6',
                            2: 'text-3xl font-bold text-primary mb-5',
                            3: 'text-2xl font-bold text-primary mb-4',
                            4: 'text-xl font-bold text-primary mb-3',
                            5: 'text-lg font-bold text-primary mb-2',
                            6: 'text-base font-bold text-primary mb-2'
                          };
                          return <Tag className={classes[level]}>{children}</Tag>;
                        },
                        list: ({ children, format }) => (
                          <ul className={`list-${format} mb-4 pl-6 space-y-2`}>
                            {children}
                          </ul>
                        ),
                        listItem: ({ children }) => (
                          <li className="text-gray-700">{children}</li>
                        ),
                        quote: ({ children }) => (
                          <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600 my-4">
                            {children}
                          </blockquote>
                        ),
                        code: ({ children }) => (
                          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4">
                            <code className="text-sm">{children}</code>
                          </pre>
                        ),
                        link: ({ children, url }) => (
                          <a 
                            href={url} 
                            className="text-primary hover:text-primary-dark underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {children}
                          </a>
                        ),
                        image: ({ image }) => (
                          <div className="my-6">
                            <img 
                              src={image.url} 
                              alt={image.alternativeText || ''}
                              className="rounded-lg shadow-md"
                            />
                            {image.caption && (
                              <p className="text-sm text-gray-500 mt-2 text-center">
                                {image.caption}
                              </p>
                            )}
                          </div>
                        )
                      }}
                      modifiers={{
                        bold: ({ children }) => (
                          <strong className="font-bold">{children}</strong>
                        ),
                        italic: ({ children }) => (
                          <em className="italic">{children}</em>
                        ),
                        underline: ({ children }) => (
                          <u className="underline">{children}</u>
                        ),
                        strikethrough: ({ children }) => (
                          <s className="line-through">{children}</s>
                        ),
                        code: ({ children }) => (
                          <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
                            {children}
                          </code>
                        )
                      }}
                    />
                  )}
                </div>

                {/* Post Metadata */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center text-gray-500">
                    <span>Published on {new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
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