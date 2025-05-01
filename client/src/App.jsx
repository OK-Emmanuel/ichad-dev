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
import { SiteConfigProvider } from './contexts/SiteConfigContext';
import ConfettiEffect from './components/ConfettiEffect';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import { teamService, hubService, configService } from './services/api';

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// Test API connection when in development
if (process.env.NODE_ENV !== 'production') {
  // Test team members API
  teamService.getTeamMembers()
    .then(data => console.log('API Connection Test - Team Members:', data))
    .catch(err => console.error('API Connection Error - Team Members:', err));
    
  // Test hubs API
  hubService.getHubs()
    .then(data => console.log('API Connection Test - Hubs:', data))
    .catch(err => console.error('API Connection Error - Hubs:', err));
    
  // Test site config API
  configService.getSiteConfig()
    .then(data => console.log('API Connection Test - Site Config:', data))
    .catch(err => console.error('API Connection Error - Site Config:', err));
    
  // Test banner API for home page
  configService.getBanner('home')
    .then(data => console.log('API Connection Test - Home Banner:', data))
    .catch(err => console.error('API Connection Error - Home Banner:', err));
}

function App() {
  // Handle Admin redirection to backend.ichadproject.org
  if (window.location.pathname.startsWith('/admin')) {
    window.location.href = `${process.env.REACT_ADMIN_URL}/admin`;
    return null;
  }

  return (
    <SiteConfigProvider>
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
      </ConfettiProvider>
    </SiteConfigProvider>
  );
}

export default App;
