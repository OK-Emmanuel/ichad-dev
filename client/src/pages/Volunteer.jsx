import { useState, useEffect, useRef } from 'react';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import TagInput from '../components/TagInput';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { useConfetti } from '../contexts/ConfettiContext';
import ConfettiEffect from '../components/ConfettiEffect';

const CustomPhoneInput = ({ value, onChange }) => (
    <PhoneInput
      international
      defaultCountry="NG"
      value={value}
      onChange={onChange}
    //   className="w-full" // Apply class to the wrapper
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" // Apply to input field
    //   
    
    />
  );
  

const Volunteer = () => {
  const { triggerConfetti } = useConfetti();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    location: '',
    skills: '',
    interests: '',
    motivation: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://formspree.io/f/maneagav', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: 'New Volunteer Application',
          _replyto: formData.email
        }),
      });

      if (response.ok) {
        triggerConfetti();
        toast.success('Thank you for your application! We will get back to you soon.', {
          duration: 5000,
          position: 'top-center',
          style: {
            background: '#1a56db',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#1a56db',
          },
        });
        
        setFormData({
          name: '',
          email: '',
          phone: '',
          qualification: '',
          location: '',
          skills: '',
          interests: '',
          motivation: ''
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      toast.error('There was an error submitting your application. Please try again.', {
        duration: 5000,
        position: 'top-center',
        style: {
          background: '#dc2626',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#dc2626',
        },
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = async (e) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, location: value }));
    
    // You can implement location autocomplete here using a service like Google Places API
  };

  return (
    <>
      <TopBar />
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <ConfettiEffect />
        {/* Banner Section */}
        <header className="h-[60vh] relative">
          <img
            src="https://res.cloudinary.com/djvolnu9s/image/upload/v1743186602/posts/yquz4cxqqhnnhohufm4u.jpg"
            alt="Volunteer with ICHAD"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Volunteer with Us</h1>
              <p className="text-xl md:text-2xl">Make a difference in young lives</p>
            </div>
          </div>
        </header>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-bold text-primary mb-8">Join Our Volunteer Team</h2>
              <p className="text-lg mb-8">
                At ICHAD, we believe in the power of community and collaboration. Our volunteers play a crucial role in helping us achieve our mission of empowering young people to lead drug-free, purposeful lives. Whether you have a few hours a week or can commit to a long-term role, we'd love to have you on our team.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <CustomPhoneInput
                      value={formData.phone}
                      onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                    <select
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select Qualification</option>
                      <option value="SSCE">SSCE</option>
                      <option value="ND">ND</option>
                      <option value="HND">HND</option>
                      <option value="BSc">BSc</option>
                      <option value="MSc">MSc</option>
                      <option value="PhD">PhD</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleLocationChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Start typing your location..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                  <TagInput
                    value={formData.skills}
                    onChange={(value) => setFormData(prev => ({ ...prev, skills: value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Interest</label>
                  <textarea
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="What areas are you interested in volunteering?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Why do you want to volunteer with us?</label>
                  <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Tell us why you want to join our team"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
      <Toaster />
    </>
  );
};

export default Volunteer; 