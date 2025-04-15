import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import WhatWeDo from './pages/WhatWeDo';
import Impact from './pages/Impact';
import News from './pages/News';
import NewsPost from './pages/NewsPost';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import Volunteer from './pages/Volunteer';
import EventDetails from './pages/EventDetails';
import Program from './pages/Program';
import Ebook from './pages/Ebook';
import DonationSuccess from './pages/DonationSuccess';
import { ConfettiProvider } from './contexts/ConfettiContext';
import ConfettiEffect from './components/ConfettiEffect';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ConfettiProvider>
      <ConfettiEffect />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<NewsPost />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/programs/:slug" element={<Program />} />
          <Route path="/ebook" element={<Ebook />} />
          <Route path="/donation-success" element={<DonationSuccess />} />
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
