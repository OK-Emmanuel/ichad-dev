import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Goals from '../components/Goals';
import VideoSection from '../components/VideoSection';
import Impact from '../components/Impact';
import Programs from '../components/Programs';
import Testimonials from '../components/Testimonials';
import Partners from '../components/Partners';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';

const Home = () => {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <Banner />
        <Goals />
        <VideoSection />
        <Impact />
        <Programs />
        <Testimonials />
        {/* <Partners /> */}
        <CallToAction />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default Home; 