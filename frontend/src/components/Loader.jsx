import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center"
          style={{ background: 'var(--bg)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-syne font-extrabold text-4xl gradient-text mb-8 tracking-tight"
          >
            ⬡ MCA Connect
          </motion.div>

          <div className="w-48 h-0.5 rounded-full overflow-hidden mb-4" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, var(--cyan), var(--purple))', boxShadow: '0 0 20px var(--cyan)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            />
          </div>

          <motion.p
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="font-mono text-xs tracking-widest"
            style={{ color: 'var(--muted)' }}
          >
            INITIALIZING PLATFORM
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
