import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Dashboard from './pages/admin/Dashboard';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute';
import PostsList from './pages/admin/posts/PostsList';
import PostForm from './pages/admin/posts/PostForm';
import NewPost from './pages/admin/posts/NewPost';
import EditPost from './pages/admin/posts/EditPost';
import ProgramsList from './pages/admin/programs/ProgramsList';
import NewProgram from './pages/admin/programs/NewProgram';
import EditProgram from './pages/admin/programs/EditProgram';
import EventsList from './pages/admin/events/EventsList';
import NewEvent from './pages/admin/events/NewEvent';
import EditEvent from './pages/admin/events/EditEvent';
import GalleryList from './pages/admin/gallery/GalleryList';
import NewGallery from './pages/admin/gallery/NewGallery';
import EditGallery from './pages/admin/gallery/EditGallery';
// import CategoryManager from './pages/admin/gallery/CategoryManager';
import SettingsManager from './pages/admin/settings/SettingsManager';
import UsersList from './pages/admin/users/UsersList';
import NewUser from './pages/admin/users/NewUser';
import EditUser from './pages/admin/users/EditUser';
import EventDetails from './pages/EventDetails';
import AlbumForm from './pages/admin/gallery/AlbumForm';
import BulkUploadPage from './pages/admin/gallery/BulkUploadPage';
import Program from './pages/Program';
import { ConfettiProvider } from './contexts/ConfettiContext';
import ConfettiEffect from './components/ConfettiEffect';
import Ebook from './pages/Ebook';

function App() {
  return (
    <ConfettiProvider>
      <AuthProvider>
        <Router>
          <ConfettiEffect />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/what-we-do" element={<WhatWeDo />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<NewsPost />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ebook" element={<Ebook />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <Navigate to="/admin/dashboard" replace />
              </ProtectedRoute>
            } />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/posts" element={
              <ProtectedRoute>
                <PostsList />
              </ProtectedRoute>
            } />
            <Route path="/admin/posts/new" element={<NewPost />} />
            <Route path="/admin/posts/edit/:id" element={<EditPost />} />
            <Route path="/admin/programs" element={
              <ProtectedRoute>
                <ProgramsList />
              </ProtectedRoute>
            } />
            <Route path="/admin/programs/new" element={
              <ProtectedRoute>
                <NewProgram />
              </ProtectedRoute>
            } />
            <Route path="/admin/programs/edit/:id" element={
              <ProtectedRoute>
                <EditProgram />
              </ProtectedRoute>
            } />
            <Route path="/admin/events" element={
              <ProtectedRoute>
                <EventsList />
              </ProtectedRoute>
            } />
            <Route path="/admin/events/new" element={
              <ProtectedRoute>
                <NewEvent />
              </ProtectedRoute>
            } />
            <Route path="/admin/events/edit/:id" element={
              <ProtectedRoute>
                <EditEvent />
              </ProtectedRoute>
            } />
            <Route path="/admin/gallery" element={
              <ProtectedRoute>
                <GalleryList />
              </ProtectedRoute>
            } />
            <Route path="/admin/gallery/new" element={
              <ProtectedRoute>
                <NewGallery />
              </ProtectedRoute>
            } />
            <Route path="/admin/gallery/edit/:id" element={
              <ProtectedRoute>
                <EditGallery />
              </ProtectedRoute>
            } />
            <Route path="/admin/gallery/bulk-upload" element={<BulkUploadPage />} />
            {/* <Route path="/admin/gallery/categories" element={
              <ProtectedRoute>
                <CategoryManager />
              </ProtectedRoute>
            } /> */}
            <Route path="/admin/settings" element={
              <ProtectedRoute>
                <SettingsManager />
              </ProtectedRoute>
            } />
            <Route path="/admin/gallery/albums/new" element={
              <ProtectedRoute>
                <AlbumForm />
              </ProtectedRoute>
            } />
            
            {/* User Management Routes */}
            <Route path="/admin/users" element={
              <ProtectedRoute>
                <UsersList />
              </ProtectedRoute>
            } />
            <Route path="/admin/users/new" element={
              <ProtectedRoute>
                <NewUser />
              </ProtectedRoute>
            } />
            <Route path="/admin/users/edit/:id" element={
              <ProtectedRoute>
                <EditUser />
              </ProtectedRoute>
            } />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/programs/:slug" element={<Program />} />
          </Routes>
        </Router>
        <ToastContainer
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
        />
      </AuthProvider>
    </ConfettiProvider>
  );
}

export default App;
