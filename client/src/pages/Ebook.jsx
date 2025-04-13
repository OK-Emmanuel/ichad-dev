import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel styles
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CallToAction from '../components/CallToAction';
import { optimizeImageUrl } from '../utils/imageOptimizer';

const Ebook = () => {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="py-16 bg-gray-50">
        <div className="container mx-auto px-4  my-10 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 mr-10 md:mb-0">
            <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
              <div>
                <img src={optimizeImageUrl("https://res.cloudinary.com/dzzavh0nq/image/upload/v1744413799/1_crcgtv_q1rtai.png", 1080, 1080)} alt="Navigating Adolescence 1" />
              </div>
              <div>
                <img src={optimizeImageUrl("https://res.cloudinary.com/dzzavh0nq/image/upload/v1744413806/2_rs7ekl_xzfrk3.png", 1080, 1080)} alt="Navigating Adolescence 2" />
              </div>
              <div>
                <img src={optimizeImageUrl("https://res.cloudinary.com/dzzavh0nq/image/upload/v1744415528/az1firw0y4tf2fyyslia_fu59ml.jpg", 1080, 1080)} alt="Navigating Adolescence 3" />
              </div>
            </Carousel>
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4">Navigating Adolescence</h1>
            <p className="text-lg mb-8">
              Discover the essential guide to navigating the challenges of adolescence. 
              This ebook provides insights and strategies to help young people thrive.
            </p>
            <a 
              href="https://selar.com/5g0705" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-dark transition-all duration-300"
            >
              Buy Now
            </a>
          </div>
        </div>
      </main>
      <CallToAction />
      <Footer />
    </>
  );
};

export default Ebook; 