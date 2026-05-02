import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import AnalyticsTab    from './AnalyticsTab';
import StudentsTab     from './StudentsTab';
import QuizResultsTab  from './QuizResultsTab';
import PostsTab        from './PostsTab';
import VideosTab       from './VideosTab';

const TABS = [
  { id:'analytics',    label:'📊 Analytics'      },
  { id:'students',     label:'👥 Students'        },
  { id:'quiz',         label:'📝 Quiz Results'    },
  { id:'posts',        label:'📰 Posts'           },
  { id:'videos',       label:'🎬 Videos'          },
];

export default function AdminDashboard() {
  const { admin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('analytics');

  return (
    <div className="min-h-screen relative z-10" style={{ background:'var(--bg)' }}>
      {/* Orbs */}
      <div className="orb" style={{ width:400,height:400,background:'var(--purple)',top:-100,right:-50 }} />
      <div className="orb" style={{ width:350,height:350,background:'var(--blue)',bottom:-50,left:-50 }} />

      {/* Header */}
      <div className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{ background:'rgba(3,7,18,0.9)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-center gap-4">
          <Link to="/" className="font-syne font-extrabold text-lg gradient-text" style={{ textDecoration:'none' }}>
            ⬡ MCA Connect
          </Link>
          <span className="badge badge-purple text-xs">Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs hidden sm:block" style={{ color:'var(--muted)' }}>
            👤 {admin?.username}
          </span>
          <Link to="/" className="btn-outline text-xs px-4 py-2" style={{ textDecoration:'none' }}>
            ← Site
          </Link>
          <button className="btn-outline text-xs px-4 py-2" onClick={logout}
            style={{ borderColor:'rgba(239,68,68,0.3)', color:'#ef4444' }}>
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} className="mb-8">
          <h1 className="font-syne font-extrabold text-3xl gradient-text mb-1">Admin Dashboard</h1>
          <p className="text-sm" style={{ color:'var(--muted)' }}>Manage MCA Connect platform</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className="text-sm px-5 py-2 rounded-xl transition-all duration-200 font-medium"
              style={{
                background: activeTab===t.id ? 'rgba(0,245,255,0.12)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${activeTab===t.id ? 'rgba(0,245,255,0.4)' : 'rgba(255,255,255,0.08)'}`,
                color: activeTab===t.id ? 'var(--cyan)' : 'rgba(255,255,255,0.55)',
                cursor: 'pointer',
                fontFamily: "'Space Grotesk', sans-serif",
              }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
            transition={{ duration:0.25 }}>
            {activeTab === 'analytics'  && <AnalyticsTab />}
            {activeTab === 'students'   && <StudentsTab />}
            {activeTab === 'quiz'       && <QuizResultsTab />}
            {activeTab === 'posts'      && <PostsTab />}
            {activeTab === 'videos'     && <VideosTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
