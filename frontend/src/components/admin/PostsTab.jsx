import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import API from '../../api';

const CATS = ['News','Update','Announcement','Achievement','Event'];

export default function PostsTab() {
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm]       = useState({ title:'', content:'', category:'News' });
  const [saving, setSaving]   = useState(false);

  const load = () => {
    setLoading(true);
    API.get('/posts').then(r => setPosts(r.data.posts)).catch(()=>{}).finally(()=>setLoading(false));
  };
  useEffect(load, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await API.post('/posts', form);
      setPosts(p => [data.post, ...p]);
      setForm({ title:'', content:'', category:'News' });
      toast.success('Post published!');
    } catch { toast.error('Failed to publish'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return;
    try {
      await API.delete(`/posts/${id}`);
      setPosts(p => p.filter(x => x._id !== id));
      toast.success('Post deleted');
    } catch { toast.error('Delete failed'); }
  };

  return (
    <div>
      {/* Add form */}
      <form onSubmit={handleAdd} className="glass-card p-6 mb-8">
        <div className="font-syne font-bold text-base mb-5" style={{ color:'rgba(255,255,255,0.8)' }}>Publish New Post</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs" style={{ color:'var(--muted)' }}>Title *</label>
            <input className="form-input" placeholder="Post title" required
              value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs" style={{ color:'var(--muted)' }}>Category</label>
            <select className="form-input" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>
              {CATS.map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className="text-xs" style={{ color:'var(--muted)' }}>Content *</label>
            <textarea className="form-input" placeholder="Write post content..." rows={4} required
              value={form.content} onChange={e=>setForm(f=>({...f,content:e.target.value}))} />
          </div>
        </div>
        <button type="submit" className="btn-primary text-sm" disabled={saving}>
          {saving ? 'Publishing…' : 'Publish Post →'}
        </button>
      </form>

      {/* Posts list */}
      <div className="font-syne font-bold text-sm mb-4" style={{ color:'rgba(255,255,255,0.6)' }}>
        Published Posts ({posts.length})
      </div>
      {loading
        ? <div className="text-center py-6 font-mono text-xs" style={{ color:'var(--muted)' }}>Loading…</div>
        : posts.length === 0
          ? <div className="text-center py-6" style={{ color:'var(--muted)' }}>No posts yet.</div>
          : posts.map(p => (
            <div key={p._id} className="glass-card p-5 mb-3 flex gap-4 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-syne font-bold text-sm">{p.title}</span>
                  <span className="badge badge-cyan text-xs">{p.category}</span>
                </div>
                <p className="text-xs leading-relaxed mb-2" style={{ color:'rgba(255,255,255,0.45)' }}>
                  {p.content.substring(0,120)}{p.content.length > 120 ? '…' : ''}
                </p>
                <span className="font-mono text-xs" style={{ color:'var(--muted)' }}>
                  {new Date(p.createdAt).toLocaleDateString()}
                </span>
              </div>
              <button onClick={() => handleDelete(p._id)}
                style={{ background:'none', border:'none', color:'var(--muted)', cursor:'pointer', fontSize:'1rem', flexShrink:0 }}>
                🗑
              </button>
            </div>
          ))
      }
    </div>
  );
}
