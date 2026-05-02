import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

export default function QRSection() {
  const url = typeof window !== 'undefined' ? window.location.origin : 'https://mca-connect.edu.in';

  return (
    <section id="qr-section" className="py-24 px-4" style={{ background: 'rgba(0,245,255,0.02)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16 flex-wrap">
          {/* QR Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.div
              animate={{ boxShadow: ['0 0 20px rgba(0,245,255,0.2)', '0 0 50px rgba(0,245,255,0.5)', '0 0 20px rgba(0,245,255,0.2)'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="p-4 rounded-2xl"
              style={{ background: '#fff' }}
            >
              <QRCodeSVG value={url} size={150} level="H" />
            </motion.div>
            <div className="font-mono text-xs tracking-widest text-center" style={{ color: 'var(--cyan)' }}>
              SCAN TO EXPLORE
            </div>
            <span className="badge badge-cyan">⬡ MCA Connect 2026</span>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 min-w-[260px]"
          >
            <div className="section-label mb-3">Campaign QR Code</div>
            <h2 className="font-syne font-extrabold mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', letterSpacing: '-1px' }}>
              Scan to Explore<br />MCA Connect
            </h2>
            <p className="text-sm leading-relaxed mb-6 font-light" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 420 }}>
              Use this QR code during college outreach campaigns, seminars, and events
              to instantly connect students with the MCA program information portal.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="badge badge-cyan">📱 Mobile Ready</span>
              <span className="badge badge-purple">🔗 Instant Access</span>
              <span className="badge badge-green">✓ Campaign Ready</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
