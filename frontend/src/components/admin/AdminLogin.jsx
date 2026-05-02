import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.username, form.password);
      toast.success('Welcome, Admin! 👋');
    } catch {
      toast.error('Invalid credentials. Try admin / mca2024');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--bg)' }}>
      {/* Orbs */}
      <div className="orb" style={{ width:500, height:500, background:'var(--blue)',   top:-150, left:-150 }} />
      <div className="orb" style={{ width:400, height:400, background:'var(--purple)', bottom:-100, right:-100 }} />

      <motion.div
        initial={{ opacity:0, y:30, scale:0.96 }}
        animate={{ opacity:1, y:0, scale:1 }}
        transition={{ duration:0.5 }}
        className="glass-card p-10 w-full max-w-md relative z-10 text-center"
      >
        <div className="font-syne font-extrabold text-2xl gradient-text mb-1">⬡ MCA Connect</div>
        <div className="text-xs font-mono tracking-widest mb-8" style={{ color:'var(--muted)' }}>ADMIN ACCESS</div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-medium" style={{ color:'rgba(255,255,255,0.55)' }}>Username</label>
            <input className="form-input" type="text" placeholder="admin"
              value={form.username} onChange={e => setForm(f=>({...f,username:e.target.value}))} required />
          </div>
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-medium" style={{ color:'rgba(255,255,255,0.55)' }}>Password</label>
            <input className="form-input" type="password" placeholder="••••••••"
              value={form.password} onChange={e => setForm(f=>({...f,password:e.target.value}))} required />
          </div>
          <button type="submit" className="btn-primary w-full justify-center mt-2" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <p className="mt-6 text-xs font-mono" style={{ color:'var(--muted)' }}>
          Default: <span style={{ color:'var(--cyan)' }}>admin</span> / <span style={{ color:'var(--cyan)' }}>mca2024</span>
        </p>
      </motion.div>
    </div>
  );
}
