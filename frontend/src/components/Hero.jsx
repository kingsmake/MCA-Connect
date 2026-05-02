import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 30 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.7, delay: 2.4 + delay },
});

const stats = [
  { value: 94,  suffix: '%',   label: 'Placement Rate'  },
  { value: 12,  prefix: '₹',  suffix: ' LPA', label: 'Avg Package'    },
  { value: 150, suffix: '+',   label: 'Hiring Partners' },
  { value: 2,   suffix: ' yrs',label: 'Program Duration'},
];

export default function Hero() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden"
      style={{ paddingTop: '8rem', paddingBottom: '4rem' }}
    >
      {/* Orbs */}
      <div className="orb" style={{ width: 600, height: 600, background: 'var(--blue)',   top: -200, left: -100 }} />
      <div className="orb" style={{ width: 500, height: 500, background: 'var(--purple)', bottom: -100, right: -100 }} />

    <motion.div {...fadeUp(0)} className="section-label mb-6">
      ⬡ ⬡ Master of Computer Applications (MCA)
        <div className="mt-2 text-xs text-cyan-400 tracking-widest leading-relaxed">
          Gokhale Education Society’s <br />
          R. H. Sapat College of Engineering, Management Studies & Research, Nashik
        </div>
      </motion.div>

      <motion.h1 {...fadeUp(0.2)}
        className="font-syne font-extrabold leading-none mb-6"
        style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-3px' }}
      >
        Discover Your<br />
        <span className="gradient-text">Future with MCA</span>
      </motion.h1>

      <motion.p {...fadeUp(0.4)}
        className="text-lg mb-10 max-w-lg leading-relaxed font-light"
        style={{ color: 'rgba(255,255,255,0.55)' }}
      >
        Master of Computer Applications — your gateway to a high-impact career
        in technology. Shape the digital world of tomorrow, today.
      </motion.p>

      <motion.div {...fadeUp(0.6)} className="flex gap-4 justify-center flex-wrap mb-16">
        <button className="btn-primary" onClick={() => scrollTo('#careers')}>
          Explore Careers ↗
        </button>
        <button className="btn-outline" onClick={() => scrollTo('#quiz')}>
          Take the Quiz
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div {...fadeUp(0.8)} ref={ref}
        className="flex gap-10 justify-center flex-wrap">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-syne font-extrabold text-3xl gradient-text">
              {inView ? (
                <CountUp
                  start={0}
                  end={s.value}
                  duration={2}
                  prefix={s.prefix || ''}
                  suffix={s.suffix || ''}
                />
              ) : `${s.prefix || ''}0${s.suffix || ''}`}
            </div>
            <div className="text-xs mt-1 tracking-widest uppercase font-mono" style={{ color: 'var(--muted)' }}>
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--muted)' }}>SCROLL</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
          <circle cx="8" cy="8" r="2" fill="currentColor">
            <animate attributeName="cy" values="8;14;8" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </motion.div>
    </section>
  );
}
