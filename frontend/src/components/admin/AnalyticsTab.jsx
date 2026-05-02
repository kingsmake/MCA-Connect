import { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement,
} from 'chart.js';
import API from '../../api';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const TOOLTIP = {
  backgroundColor:'rgba(5,13,26,0.95)', borderColor:'rgba(0,245,255,0.2)',
  borderWidth:1, titleColor:'#fff', bodyColor:'rgba(255,255,255,0.6)', padding:10, cornerRadius:8,
};
const AXIS = { ticks:{color:'rgba(255,255,255,0.4)',font:{size:11}}, grid:{color:'rgba(255,255,255,0.05)'} };

export default function AnalyticsTab() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/analytics').then(r => setData(r.data)).catch(()=>{}).finally(()=>setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-12 font-mono text-xs" style={{ color:'var(--muted)' }}>Loading analytics...</div>;
  if (!data)   return <div className="text-center py-12" style={{ color:'var(--muted)' }}>Could not load analytics. Make sure the backend is running.</div>;

  const overviewCards = [
    { label:'Total Students', value: data.overview.totalStudents,  color:'var(--cyan)'   },
    { label:'Quiz Attempts',  value: data.overview.totalQuiz,      color:'var(--purple)' },
    { label:'Active Posts',   value: data.overview.totalPosts,     color:'var(--green)'  },
    { label:'Videos',         value: data.overview.totalVideos,    color:'var(--pink)'   },
  ];

  const interestColors = { 'Very High':'#10b981','High':'#00f5ff','Medium':'#3b82f6','Low':'#6b7280' };

  const interestChart = {
    labels: data.interestDistribution.map(d => d._id),
    datasets: [{
      data: data.interestDistribution.map(d => d.count),
      backgroundColor: data.interestDistribution.map(d => interestColors[d._id] || '#888'),
      borderRadius: 6,
    }],
  };

  const regChart = {
    labels: data.recentRegistrations.map(d => d._id),
    datasets: [{
      label: 'Registrations',
      data: data.recentRegistrations.map(d => d.count),
      backgroundColor: 'rgba(0,245,255,0.6)',
      borderColor: 'var(--cyan)',
      borderWidth: 1,
      borderRadius: 6,
    }],
  };

  return (
    <div>
      {/* Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {overviewCards.map(c => (
          <div key={c.label} className="glass-card p-5 text-center">
            <div className="font-syne font-extrabold text-3xl mb-1" style={{ color:c.color }}>{c.value}</div>
            <div className="text-xs" style={{ color:'var(--muted)' }}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-5">
          <div className="font-syne font-bold text-sm mb-4" style={{ color:'rgba(255,255,255,0.7)' }}>Interest Level Distribution</div>
          <Bar data={interestChart} options={{ plugins:{ legend:{ display:false }, tooltip:TOOLTIP }, scales:{ x:AXIS, y:{...AXIS,beginAtZero:true} } }} height={200} />
        </div>
        <div className="glass-card p-5">
          <div className="font-syne font-bold text-sm mb-4" style={{ color:'rgba(255,255,255,0.7)' }}>Registrations (Last 7 Days)</div>
          {data.recentRegistrations.length > 0
            ? <Bar data={regChart} options={{ plugins:{ legend:{ display:false }, tooltip:TOOLTIP }, scales:{ x:AXIS, y:{...AXIS,beginAtZero:true} } }} height={200} />
            : <div className="flex items-center justify-center h-32 text-sm" style={{ color:'var(--muted)' }}>No data yet</div>
          }
        </div>
      </div>

      {/* Top Colleges */}
      {data.topColleges.length > 0 && (
        <div className="glass-card p-5">
          <div className="font-syne font-bold text-sm mb-4" style={{ color:'rgba(255,255,255,0.7)' }}>Top Colleges</div>
          <div className="flex flex-col gap-3">
            {data.topColleges.map((c,i) => (
              <div key={c._id} className="flex items-center gap-3">
                <span className="font-mono text-xs w-5" style={{ color:'var(--muted)' }}>{i+1}</span>
                <span className="flex-1 text-sm">{c._id}</span>
                <span className="badge badge-cyan">{c.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
