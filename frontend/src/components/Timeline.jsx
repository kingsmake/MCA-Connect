import { motion } from 'framer-motion';
import { TIMELINE_STEPS } from '../data';

const dotColors = ['var(--cyan)', 'var(--blue)', 'var(--purple)', 'var(--pink)', 'var(--green)'];

export default function Timeline() {
  return (
    <section id="timeline" className="py-24 px-4" style={{ background: 'rgba(168,85,247,0.02)' }}>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity:0,y:30 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true }} className="mb-14 text-center">
          <div className="section-label">MCA Journey</div>
          <h2 className="font-syne font-extrabold mb-3" style={{ fontSize:'clamp(1.8rem,4vw,3rem)', letterSpacing:'-1px' }}>
            Your 2-Year<br />Transformation Path
          </h2>
          <div className="section-divider mx-auto" />
        </motion.div>

        <div className="relative">
          {/* Center line — hidden on mobile */}
          <div className="tl-line hidden md:block" />

          {TIMELINE_STEPS.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={step.step}
                className="flex items-start gap-8 mb-12 relative"
                style={{ flexDirection: isEven ? 'row' : 'row-reverse' }}
                initial={{ opacity:0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.6, delay: i*0.1 }}
              >
                {/* Content */}
                <div className="flex-1 glass-card p-6" style={{ textAlign: isEven ? 'left' : 'right' }}>
                  <div className="section-label mb-2">Step {step.step}</div>
                  <h3 className="font-syne font-bold text-lg mb-2">
                    {step.icon} {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-light" style={{ color:'rgba(255,255,255,0.5)' }}>
                    {step.desc}
                  </p>
                </div>

                {/* Spacer + dot */}
                <div className="hidden md:flex flex-1 items-start justify-center pt-6">
                  <div
                    className="w-3.5 h-3.5 rounded-full z-10 relative"
                    style={{
                      background: dotColors[i],
                      boxShadow: `0 0 20px ${dotColors[i]}`,
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      marginTop: '1.5rem',
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
