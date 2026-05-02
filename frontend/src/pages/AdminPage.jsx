import { useAuth } from '../context/AuthContext';
import AdminLogin     from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';
import ParticleCanvas from '../components/ParticleCanvas';

export default function AdminPage() {
  const { admin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background:'var(--bg)' }}>
        <div className="font-mono text-xs tracking-widest" style={{ color:'var(--muted)' }}>
          LOADING…
        </div>
      </div>
    );
  }

  return (
    <>
      <ParticleCanvas />
      {admin ? <AdminDashboard /> : <AdminLogin />}
    </>
  );
}
