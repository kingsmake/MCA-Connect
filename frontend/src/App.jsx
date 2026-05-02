import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import AdminPage from './pages/AdminPage';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import ParticleCanvas from './components/ParticleCanvas';
import Loader from './components/Loader';

export default function App() {
  return (
    <AuthProvider>
      <Loader />
      <Cursor />
      <ScrollProgress />
      <ParticleCanvas />
      <Routes>
        <Route path="/"       element={<Home />} />
        <Route path="/admin"  element={<AdminPage />} />
      </Routes>
    </AuthProvider>
  );
}
