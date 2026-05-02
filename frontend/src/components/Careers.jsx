import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CAREER_DATA } from '../data';

export default function Careers() {
  const [active, setActive] = useState(null);

  return (
    <section id="careers" className="py-24 px-4" style={{ background: 'rgba(168,85,247,0.02)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="mb-14"
        >
          <div className="section-label">Career Explorer</div>
          <h2 className="font-syne font-extrabold mb-3" style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', letterSpacing: '-1px' }}>
            Choose Your<br />Tech Destiny
          </h2>
          <div className="section-divider" />
          <p className="text-sm leading-relaxed max-w-lg font-light" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Click on any career path to explore required skills, salary range, and growth opportunities.
          </p>
        </motion.div>

        {/* Career cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {CAREER_DATA.map((c, i) => (
            <motion.div
              key={c.id}
              className={`career-card glass-card p-5 cursor-pointer relative overflow-hidden ${active?.id === c.id ? 'active' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              onClick={() => setActive(active?.id === c.id ? null : c)}
              style={{
                borderColor: active?.id === c.id ? 'rgba(0,245,255,0.4)' : undefined,
                background: active?.id === c.id ? 'rgba(0,245,255,0.06)' : undefined,
              }}
            >
              {/* bottom glow line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 transition-transform duration-300 origin-left"
                style={{
                  background: 'linear-gradient(90deg, var(--cyan), var(--purple))',
                  transform: active?.id === c.id ? 'scaleX(1)' : 'scaleX(0)',
                }} />
              <div className="text-3xl mb-3">{c.icon}</div>
              <div className="font-syne font-bold text-sm mb-1">{c.title}</div>
              <div className="text-xs" style={{ color: 'var(--muted)' }}>{c.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="glass-card p-8"
              style={{ borderColor: 'rgba(99,179,255,0.25)' }}
            >
              <div className="font-syne font-extrabold text-2xl mb-6 gradient-text">
                {active.icon} {active.title}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <div className="section-label mb-3">Skills Required</div>
                  <div className="flex flex-wrap gap-2">
                    {active.skills.map(s => <span key={s} className="skill-tag">{s}</span>)}
                  </div>
                </div>
                <div>
                  <div className="section-label mb-3">Salary Range</div>
                  <div className="font-syne font-extrabold text-2xl" style={{ color: 'var(--green)' }}>
                    {active.salary}
                  </div>
                </div>
                <div>
                  <div className="section-label mb-3">Growth Outlook</div>
                  <div className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {active.growth}
                  </div>
                </div>
                <div>
                  <div className="section-label mb-3">Top Employers</div>
                  <div className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {active.companies}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
