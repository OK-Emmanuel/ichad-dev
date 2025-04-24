import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import WhatWeDo from './pages/WhatWeDo';
import Impact from './pages/Impact';
import Updates from './pages/Updates';
import UpdateDetails from './pages/UpdateDetails';
import Gallery from './pages/Gallery';
import Volunteer from './pages/Volunteer';
import Program from './pages/Program';
import Ebook from './pages/Ebook';
import DonationSuccess from './pages/DonationSuccess';
import Partner from './pages/Partner';
import HubDetail from './components/HubDetail';
import OAULanding from './components/OAULanding';
import { ConfettiProvider } from './contexts/ConfettiContext';
import ConfettiEffect from './components/ConfettiEffect';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function App() {
  // Handle Strapi redirection
  if (window.location.pathname.startsWith('/admin')) {
    window.location.href = `${process.env.REACT_APP_STRAPI_URL}/admin`;
    return null;
  }

  return (
    <ConfettiProvider>
      <ConfettiEffect />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/updates/:slug" element={<UpdateDetails />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/programs/:slug" element={<Program />} />
          <Route path="/ebook" element={<Ebook />} />
          <Route path="/donation-success" element={<DonationSuccess />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/hubs/:hubName" element={<HubDetail />} />
          <Route path="/oau" element={<OAULanding />} />
          <Route path="/updates/posts" element={<Posts />} />
          <Route path="/updates/events" element={<Events />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:postSlug" element={<PostDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventSlug" element={<EventDetail />} />
        </Routes>
      </Router>
      {/* If you are using react-toastify, keep this. If using react-hot-toast, 
          ensure <Toaster /> is included in relevant page components or a layout component */}
      {/* <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            limit={1}
          /> */}
    </ConfettiProvider>
  );
}

export default App;
