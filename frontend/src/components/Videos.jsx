import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { DEFAULT_VIDEOS } from '../data';
import API from '../api';

export default function Videos() {
  const [videos, setVideos] = useState(DEFAULT_VIDEOS);

  useEffect(() => {
    API.get('/videos')
      .then(({ data }) => { if (data.videos?.length) setVideos(data.videos); })
      .catch(() => {});
  }, []);

  const handlePlay = (v) => {
    if (v.videoUrl?.includes('youtube') || v.videoUrl?.includes('youtu.be')) {
      window.open(v.videoUrl, '_blank');
    } else {
      toast(`▶ Playing: ${v.title}`, { icon: '🎬' });
    }
  };

  const emojis = ['🎓','🏆','🌟','💼','🔬','📊','🎬','🖥️'];

  return (
    <section id="videos" className="py-24 px-4" style={{ background: 'rgba(168,85,247,0.02)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity:0,y:30 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true }} className="mb-12">
          <div className="section-label">MCA Department</div>
          <h2 className="font-syne font-extrabold mb-3" style={{ fontSize:'clamp(1.8rem,4vw,3rem)', letterSpacing:'-1px' }}>
            See It in Action
          </h2>
          <div className="section-divider" />
          <p className="text-sm leading-relaxed font-light" style={{ color:'rgba(255,255,255,0.5)', maxWidth:480 }}>
            Watch videos about the MCA program, campus life, alumni success stories, and more.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.slice(0, 6).map((v, i) => (
            <motion.div key={v._id || i}
              className="glass-card overflow-hidden cursor-pointer group"
              initial={{ opacity:0,y:30 }} whileInView={{ opacity:1,y:0 }}
              viewport={{ once:true }} transition={{ delay: i*0.08 }}
              onClick={() => handlePlay(v)}
            >
              {/* Thumbnail */}
              <div className="relative w-full overflow-hidden"
                style={{ aspectRatio:'16/9', background:'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(59,130,246,0.2))' }}>
                {/* Overlay */}
                <div className="absolute inset-0 transition-all duration-300 group-hover:bg-transparent"
                  style={{ background:'rgba(0,0,0,0.35)' }} />
                {/* Emoji */}
                <div className="absolute inset-0 flex items-center justify-center text-7xl z-0 select-none"
                  style={{ filter:'drop-shadow(0 0 20px rgba(0,245,255,0.4))' }}>
                  {v.emoji || emojis[i % emojis.length]}
                </div>
                {/* Play button */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-10"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-black font-bold text-lg transition-all duration-300 group-hover:shadow-[0_0_30px_var(--cyan)]"
                    style={{ background:'rgba(0,245,255,0.92)' }}>
                    ▶
                  </div>
                </motion.div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="font-syne font-bold text-sm mb-1 leading-snug">{v.title}</div>
                <div className="text-xs" style={{ color:'var(--muted)' }}>{v.description || v.meta || ''}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
