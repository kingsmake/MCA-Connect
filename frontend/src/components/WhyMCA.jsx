import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { WHY_CARDS } from '../data';

const colorMap = {
  cyan:   { bg: 'rgba(0,245,255,0.1)',   tag: 'badge-cyan'   },
  purple: { bg: 'rgba(168,85,247,0.1)',  tag: 'badge-purple' },
  green:  { bg: 'rgba(16,185,129,0.1)',  tag: 'badge-green'  },
  pink:   { bg: 'rgba(236,72,153,0.1)',  tag: 'badge-pink'   },
  blue:   { bg: 'rgba(59,130,246,0.1)',  tag: 'badge-blue'   },
  yellow: { bg: 'rgba(245,158,11,0.1)',  tag: ''             },
};

export default function WhyMCA() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="why" className="relative py-24 px-4" style={{ background: 'linear-gradient(180deg, transparent, rgba(59,130,246,0.04), transparent)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="section-label">Why Choose MCA</div>
          <h2 className="font-syne font-extrabold mb-3" style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', letterSpacing: '-1px' }}>
            Built for the Future<br />of Technology
          </h2>
          <div className="section-divider" />
          <p className="text-sm leading-relaxed max-w-lg font-light" style={{ color: 'rgba(255,255,255,0.5)' }}>
            MCA equips you with industry-ready skills, real-world exposure, and a network that opens doors across the globe.
          </p>
        </motion.div>

        {/* Cards */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_CARDS.map((card, i) => {
            const c = colorMap[card.color] || colorMap.cyan;
            return (
              <motion.div
                key={card.title}
                className="glass-card p-8 cursor-default relative overflow-hidden group"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* bg shimmer on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(0,245,255,0.04), transparent)' }} />

                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
                  style={{ background: c.bg }}>
                  {card.icon}
                </div>
                <h3 className="font-syne font-bold text-lg mb-2">{card.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>{card.text}</p>
                <span className={`badge ${c.tag || 'badge-cyan'}`}>{card.tag}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
