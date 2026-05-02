import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, Filler,
} from 'chart.js';
import { Doughnut, Line, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale,
  PointElement, LineElement, BarElement, Filler);

const COUNTERS = [
  { value: 94,  suffix: '%',    label: 'Placement Rate'    },
  { value: 12,  prefix: '₹',   suffix: ' LPA', label: 'Average Package'   },
  { value: 32,  prefix: '₹',   suffix: ' LPA', label: 'Highest Package'   },
  { value: 150, suffix: '+',    label: 'Hiring Companies'  },
  { value: 500, suffix: '+',    label: 'Alumni Network'    },
  { value: 18,  suffix: ' yrs', label: 'Years of Excellence'},
];

const TOOLTIP_OPTS = {
  backgroundColor: 'rgba(5,13,26,0.95)',
  borderColor: 'rgba(0,245,255,0.25)',
  borderWidth: 1,
  titleColor: '#fff',
  bodyColor: 'rgba(255,255,255,0.65)',
  padding: 12,
  cornerRadius: 8,
};
const AXIS_STYLE = { ticks: { color: 'rgba(255,255,255,0.45)', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.05)' } };

export default function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  const doughnutData = {
    labels: ['IT Services', 'Product Co.', 'Startups', 'BFSI', 'E-commerce', 'Govt/PSU'],
    datasets: [{
      data: [32, 24, 18, 12, 9, 5],
      backgroundColor: ['#00f5ff','#3b82f6','#a855f7','#ec4899','#10b981','#f59e0b'],
      borderWidth: 2,
      borderColor: '#030712',
      hoverOffset: 8,
    }],
  };

  const lineData = {
    labels: ['2019','2020','2021','2022','2023','2024'],
    datasets: [
      { label: 'MCA Jobs (thousands)', data: [45,48,62,78,91,108], borderColor: '#00f5ff', backgroundColor: 'rgba(0,245,255,0.07)', tension: 0.4, fill: true, pointBackgroundColor: '#00f5ff', pointRadius: 5, borderWidth: 2 },
      { label: 'BCA Jobs (thousands)', data: [30,31,38,45,52,58],  borderColor: '#a855f7', backgroundColor: 'rgba(168,85,247,0.05)', tension: 0.4, fill: true, pointBackgroundColor: '#a855f7', pointRadius: 5, borderWidth: 2 },
    ],
  };

  const barData = {
    labels: ['0–5', '5–8', '8–12', '12–18', '18–25', '25+'],
    datasets: [{
      label: 'Students (%)',
      data: [5, 22, 38, 20, 10, 5],
      backgroundColor: 'rgba(59,130,246,0.65)',
      borderColor: '#3b82f6',
      borderWidth: 1,
      borderRadius: 6,
      hoverBackgroundColor: 'rgba(0,245,255,0.7)',
    }],
  };

  const commonOpts = { plugins: { legend: { labels: { color: 'rgba(255,255,255,0.55)', font: { size: 11 } } }, tooltip: TOOLTIP_OPTS } };

  return (
    <section id="stats" className="py-24 px-4" style={{ background: 'linear-gradient(180deg,transparent,rgba(0,245,255,0.03),transparent)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity:0,y:30 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} className="mb-14">
          <div className="section-label">Placement Statistics</div>
          <h2 className="font-syne font-extrabold mb-3" style={{ fontSize:'clamp(1.8rem,4vw,3rem)', letterSpacing:'-1px' }}>
            Numbers That<br />Speak Volumes
          </h2>
          <div className="section-divider" />
        </motion.div>

        {/* Counters */}
        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-14">
          {COUNTERS.map((c, i) => (
            <motion.div key={c.label}
              className="glass-card p-5 text-center"
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay: i*0.08 }}
            >
              <div className="font-syne font-extrabold text-2xl gradient-text">
                {inView
                  ? <CountUp start={0} end={c.value} duration={2} prefix={c.prefix||''} suffix={c.suffix||''} />
                  : `${c.prefix||''}0${c.suffix||''}`
                }
              </div>
              <div className="text-xs mt-1" style={{ color:'var(--muted)' }}>{c.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Industry-wise Placement', chart: <Doughnut data={doughnutData} options={{ ...commonOpts, cutout:'65%' }} /> },
            { title: 'Year-wise Job Growth Trend', chart: <Line data={lineData} options={{ ...commonOpts, scales:{ x:AXIS_STYLE, y:AXIS_STYLE } }} /> },
            { title: 'Package Distribution (LPA)', chart: <Bar data={barData} options={{ ...commonOpts, scales:{ x:AXIS_STYLE, y:{...AXIS_STYLE, beginAtZero:true} } }} /> },
          ].map((item, i) => (
            <motion.div key={item.title}
              className="glass-card p-6"
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay: i*0.15 }}
            >
              <div className="font-syne font-bold text-sm mb-5" style={{ color:'rgba(255,255,255,0.75)' }}>{item.title}</div>
              {item.chart}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
