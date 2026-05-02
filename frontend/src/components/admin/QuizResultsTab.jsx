import { useEffect, useState } from 'react';
import API from '../../api';

const BADGE = {
  'Excellent Fit': 'badge-green',
  'Good Fit':      'badge-blue',
  'Explore First': 'badge-cyan',
};

export default function QuizResultsTab() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/quiz')
      .then(r => setResults(r.data.results))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-10 font-mono text-xs" style={{ color:'var(--muted)' }}>Loading…</div>;
  if (!results.length) return <div className="text-center py-10" style={{ color:'var(--muted)' }}>No quiz results yet.</div>;

  return (
    <div style={{ overflowX:'auto' }}>
      <table className="data-table">
        <thead>
          <tr><th>#</th><th>Name</th><th>Score</th><th>%</th><th>Suggestion</th><th>Date</th></tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={r._id}>
              <td style={{ color:'var(--muted)' }}>{i+1}</td>
              <td className="font-medium">{r.name}</td>
              <td>
                <span className="font-syne font-bold" style={{ color:'var(--cyan)' }}>
                  {r.score}/{r.totalQuestions}
                </span>
              </td>
              <td>{r.percentage}%</td>
              <td><span className={`badge ${BADGE[r.suggestion] || 'badge-cyan'}`}>{r.suggestion}</span></td>
              <td style={{ color:'var(--muted)' }}>{new Date(r.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
