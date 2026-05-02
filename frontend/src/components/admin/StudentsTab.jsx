import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import API from '../../api';

const INTEREST_COLOR = {
  'Very High': 'var(--green)', High: 'var(--cyan)', Medium: 'var(--blue)', Low: 'var(--muted)',
};

export default function StudentsTab() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [filter, setFilter]     = useState('');

  const load = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (filter) params.set('interest', filter);
    API.get(`/students?${params}`)
      .then(r => setStudents(r.data.students))
      .catch(() => toast.error('Could not load students'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this record?')) return;
    try {
      await API.delete(`/students/${id}`);
      setStudents(s => s.filter(x => x._id !== id));
      toast.success('Record deleted');
    } catch { toast.error('Delete failed'); }
  };

  const handleContact = async (id) => {
    try {
      const { data } = await API.patch(`/students/${id}`, { contacted: true });
      setStudents(s => s.map(x => x._id === id ? data.student : x));
      toast.success('Marked as contacted');
    } catch { toast.error('Update failed'); }
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input className="form-input flex-1 min-w-[180px]" placeholder="Search name / college / email…"
          value={search} onChange={e => setSearch(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && load()} style={{ maxWidth:300 }} />
        <select className="form-input" value={filter} onChange={e => { setFilter(e.target.value); }}
          style={{ width:'auto', minWidth:160 }}>
          <option value="">All Levels</option>
          {['Very High','High','Medium','Low'].map(v => <option key={v}>{v}</option>)}
        </select>
        <button className="btn-primary px-5 py-2 text-sm" onClick={load}>Search</button>
      </div>

      {loading
        ? <div className="text-center py-10 font-mono text-xs" style={{ color:'var(--muted)' }}>Loading…</div>
        : students.length === 0
          ? <div className="text-center py-10" style={{ color:'var(--muted)' }}>No students found.</div>
          : (
            <div style={{ overflowX:'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#</th><th>Name</th><th>College</th><th>Email</th>
                    <th>Phone</th><th>Interest</th><th>Date</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s, i) => (
                    <tr key={s._id}>
                      <td style={{ color:'var(--muted)' }}>{i+1}</td>
                      <td className="font-medium">{s.name}</td>
                      <td>{s.college}</td>
                      <td>{s.email}</td>
                      <td>{s.phone}</td>
                      <td>
                        <span className="font-semibold text-xs" style={{ color: INTEREST_COLOR[s.interestLevel] || 'var(--text)' }}>
                          {s.interestLevel}
                        </span>
                      </td>
                      <td style={{ color:'var(--muted)' }}>
                        {new Date(s.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <div className="flex gap-2">
                          {!s.contacted && (
                            <button onClick={() => handleContact(s._id)}
                              className="text-xs px-2 py-1 rounded"
                              style={{ background:'rgba(16,185,129,0.15)', color:'var(--green)', border:'1px solid rgba(16,185,129,0.3)', cursor:'pointer' }}>
                              ✓ Contact
                            </button>
                          )}
                          {s.contacted && <span className="text-xs" style={{ color:'var(--green)' }}>✓ Contacted</span>}
                          <button onClick={() => handleDelete(s._id)}
                            className="text-xs px-2 py-1 rounded"
                            style={{ background:'rgba(239,68,68,0.1)', color:'#ef4444', border:'1px solid rgba(239,68,68,0.25)', cursor:'pointer' }}>
                            🗑
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
      }
    </div>
  );
}
