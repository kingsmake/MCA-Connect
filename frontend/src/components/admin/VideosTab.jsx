import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import API from '../../api';

const CATS = ['Overview','Placement','Alumni','Campus','Research','Other'];

export default function VideosTab() {
  const [videos, setVideos]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm]       = useState({ title:'', description:'', videoUrl:'', duration:'', category:'Other' });
  const [saving, setSaving]   = useState(false);

  const load = () => {
    setLoading(true);
    API.get('/videos').then(r => setVideos(r.data.videos)).catch(()=>{}).finally(()=>setLoading(false));
  };
  useEffect(load, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await API.post('/videos', form);
      setVideos(v => [data.video, ...v]);
      setForm({ title:'', description:'', videoUrl:'', duration:'', category:'Other' });
      toast.success('Video added!');
    } catch { toast.error('Failed to add video'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this video?')) return;
    try {
      await API.delete(`/videos/${id}`);
      setVideos(v => v.filter(x => x._id !== id));
      toast.success('Video removed');
    } catch { toast.error('Delete failed'); }
  };

  return (
    <div>
      {/* Add form */}
      <form onSubmit={handleAdd} className="glass-card p-6 mb-8">
        <div className="font-syne font-bold text-base mb-5" style={{ color:'rgba(255,255,255,0.8)' }}>Add New Video</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs" style={{ color:'var(--muted)' }}>Video Title *</label>
            <input className="form-input" placeholder="e.g. MCA Campus Tour" required
              value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs" style={{ color:'var(--muted)' }}>Category</label>
            <select className="form-input" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>
              {CATS.map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs" style={{ color:'var(--muted)' }}>YouTube URL</label>
            <input className="form-input" placeholder="https://youtube.com/watch?v=..."
              value={form.videoUrl} onChange={e=>setForm(f=>({...f,videoUrl:e.target.value}))} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs" style={{ color:'var(--muted)' }}>Duration</label>
            <input className="form-input" placeholder="e.g. 5 min"
              value={form.duration} onChange={e=>setForm(f=>({...f,duration:e.target.value}))} />
          </div>
          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className="text-xs" style={{ color:'var(--muted)' }}>Description</label>
            <textarea className="form-input" placeholder="Short description of the video..." rows={3}
              value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} />
          </div>
        </div>
        <button type="submit" className="btn-primary text-sm" disabled={saving}>
          {saving ? 'Adding…' : 'Add Video →'}
        </button>
      </form>

      {/* Videos list */}
      <div className="font-syne font-bold text-sm mb-4" style={{ color:'rgba(255,255,255,0.6)' }}>
        Existing Videos ({videos.length})
      </div>
      {loading
        ? <div className="text-center py-6 font-mono text-xs" style={{ color:'var(--muted)' }}>Loading…</div>
        : videos.length === 0
          ? <div className="text-center py-6" style={{ color:'var(--muted)' }}>No videos yet.</div>
          : videos.map(v => (
            <div key={v._id} className="glass-card p-5 mb-3 flex gap-4 items-start">
              <div className="text-3xl">🎬</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-syne font-bold text-sm">{v.title}</span>
                  <span className="badge badge-purple">{v.category}</span>
                  {v.duration && <span className="badge badge-cyan">{v.duration}</span>}
                </div>
                {v.description && <p className="text-xs mb-1" style={{ color:'rgba(255,255,255,0.45)' }}>{v.description.substring(0,80)}</p>}
                {v.videoUrl && (
                  <a href={v.videoUrl} target="_blank" rel="noopener noreferrer"
                    className="text-xs" style={{ color:'var(--cyan)', textDecoration:'none' }}>
                    {v.videoUrl.substring(0,50)}…
                  </a>
                )}
              </div>
              <button onClick={() => handleDelete(v._id)}
                style={{ background:'none', border:'none', color:'var(--muted)', cursor:'pointer', fontSize:'1rem', flexShrink:0 }}>
                🗑
              </button>
            </div>
          ))
      }
    </div>
  );
}
