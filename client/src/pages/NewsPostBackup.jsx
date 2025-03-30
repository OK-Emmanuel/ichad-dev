import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { useParams } from 'react-router-dom';

const NewsPost = () => {
  const { slug } = useParams();

  // This will be replaced with actual data from backend
  const post = {
    title: "ICHAD Project Launches New NAVIGATE Cohort",
    date: "15 Mar 2024",
    author: "ICHAD",
    image: "/src/assets/news/navigate-launch.jpg",
    content: [
      {
        type: "paragraph",
        text: "The ICHAD Project marked another milestone today with the launch of its latest NAVIGATE program cohort, welcoming 25 young adults from various communities across Lagos State. This eight-week intensive mentorship program continues our commitment to empowering youth with the knowledge and skills needed for a drug-free future."
      },
      {
        type: "subheading",
        text: "Program Highlights"
      },
      {
        type: "paragraph",
        text: "This cohort introduces several enhanced features to our established curriculum:"
      },
      {
        type: "list",
        items: [
          "Peer-to-peer mentorship opportunities",
          "Interactive workshops on substance abuse prevention",
          "Career development sessions",
          "Mental health awareness training"
        ]
      },
      {
        type: "quote",
        text: "Our NAVIGATE program is more than just education – it's about building a community of young leaders who will drive positive change in their environments.",
        author: "Okey Davids, Community Director"
      },
      {
        type: "paragraph",
        text: "The launch event featured inspiring speeches from program alumni and community leaders, highlighting the transformative impact of the NAVIGATE program on young lives."
      }
    ],
    tags: ["NAVIGATE", "Youth Development", "Drug Prevention", "Community Impact"],
    relatedPosts: [
      {
        title: "School Drug Sensitization Campaign Reaches 5 New Schools",
        slug: "school-campaign-q1-2024",
        image: "/src/assets/news/school-campaign.jpg"
      },
      {
        title: "Partnership with Local Government Strengthens Community Impact",
        slug: "local-govt-partnership",
        image: "/src/assets/news/partnership.jpg"
      }
    ]
  };

  return (
    <>
      <TopBar />
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Image */}
        <div className="w-full h-[60vh] relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 max-w-[900px] -mt-20 relative z-10">
          <article className="bg-white rounded-lg shadow-xl p-8 mb-12">
            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
              <span className="flex items-center">
                <i className="ri-user-3-line mr-2"></i>
                By {post.author}
              </span>
              <span className="flex items-center">
                <i className="ri-calendar-line mr-2"></i>
                {post.date}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              {post.title}
            </h1>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {post.content.map((block, index) => {
                switch (block.type) {
                  case 'paragraph':
                    return (
                      <p key={index} className="text-gray-700 mb-6">
                        {block.text}
                      </p>
                    );
                  case 'subheading':
                    return (
                      <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                        {block.text}
                      </h2>
                    );
                  case 'list':
                    return (
                      <ul key={index} className="list-disc pl-6 mb-6 space-y-2">
                        {block.items.map((item, i) => (
                          <li key={i} className="text-gray-700">{item}</li>
                        ))}
                      </ul>
                    );
                  case 'quote':
                    return (
                      <blockquote key={index} className="border-l-4 border-primary pl-4 my-8">
                        <p className="text-xl text-gray-700 italic mb-2">{block.text}</p>
                        <cite className="text-sm text-gray-600">— {block.author}</cite>
                      </blockquote>
                    );
                  default:
                    return null;
                }
              })}
            </div>

            {/* Tags */}
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
          </article>

          {/* Related Posts */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {post.relatedPosts.map((related, index) => (
                <a 
                  key={index}
                  href={`/news/${related.slug}`}
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {related.title}
                    </h3>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default NewsPost; 