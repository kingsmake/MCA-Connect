import { motion } from 'framer-motion';

const footerLinks = [
  { label: 'Home',     href: '#hero'          },
  { label: 'Why MCA',  href: '#why'           },
  { label: 'Careers',  href: '#careers'       },
  { label: 'Stats',    href: '#stats'         },
  { label: 'Journey',  href: '#timeline'      },
  { label: 'Quiz',     href: '#quiz'          },
  { label: 'Register', href: '#interest-form' },
  { label: 'Videos',   href: '#videos'        },
];

export default function Footer() {
  const scrollTo = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-16 pb-8 px-4 text-center"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}>
          <div className="font-syne font-extrabold text-2xl gradient-text mb-3">
            ⬡ MCA Connect 
            <span className="text-sm ml-2 text-cyan-400">| RH Sapat</span>
          </div>
          <p className="text-sm mb-2 leading-relaxed" style={{ color:'rgba(255,255,255,0.4)' }}>
            Department of Computer Applications <br />
            R. H. Sapat College of Engineering, Management Studies & Research, Nashik
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 my-6">
            {footerLinks.map(l => (
              <a key={l.label} href={l.href} onClick={(e) => scrollTo(e, l.href)}
                className="text-xs transition-colors duration-200"
                style={{ color:'rgba(255,255,255,0.35)', textDecoration:'none' }}
                onMouseEnter={e => e.target.style.color = 'var(--cyan)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.35)'}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="h-px mb-6" style={{ background:'rgba(255,255,255,0.06)' }} />
          <p className="text-xs" style={{ color:'rgba(255,255,255,0.25)' }}>
            © 2026 MCA Department, R. H. Sapat College, Nashik. All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
