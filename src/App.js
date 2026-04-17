import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import UserPage from './pages/UserPage';
import UserDetailPage from './pages/UserDetailPage';
import PostsPage from './pages/PostsPage';
import AlbumsPage from './pages/AlbumsPage';
import AlbumDetailPage from './pages/AlbumDetailPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<UserPage />} />
          <Route path="user/:id" element={<UserDetailPage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path="albums" element={<AlbumsPage />} />
          <Route path="album/:id" element={<AlbumDetailPage />} />
          {/* Add more routes here as pages are created */}
          {/* <Route path="about" element={<AboutPage />} /> */}
          {/* <Route path="dashboard" element={<DashboardPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
