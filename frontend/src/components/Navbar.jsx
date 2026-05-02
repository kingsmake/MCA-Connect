import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const links = [
  { label: 'Home',     href: '#hero'          },
  { label: 'Why MCA',  href: '#why'           },
  { label: 'Careers',  href: '#careers'       },
  { label: 'Stats',    href: '#stats'         },
  { label: 'Journey',  href: '#timeline'      },
  { label: 'Quiz',     href: '#quiz'          },
  { label: 'Register', href: '#interest-form' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 2.2 }}
      className="fixed top-0 left-0 right-0 z-[1000] px-6 py-4 flex items-center justify-between"
      style={{
        background: scrolled ? 'rgba(3,7,18,0.95)' : 'rgba(3,7,18,0.7)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        transition: 'all 0.3s ease',
        padding: scrolled ? '0.6rem 1.5rem' : '1rem 1.5rem',
      }}
    >
      {/* Logo */}
      <a href="#hero" onClick={(e) => scrollTo(e, '#hero')}
        className="font-syne font-extrabold text-xl gradient-text tracking-tight">
          ⬡ MCA Connect 
        <span className="text-xs ml-2 text-cyan-400 font-medium">
    |     RH Sapat
        </span>
      </a>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-6 list-none">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              onClick={(e) => scrollTo(e, l.href)}
              className="text-sm font-medium relative group"
              style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                style={{ background: 'var(--cyan)' }} />
              <style>{`a:hover{color:var(--cyan)!important}`}</style>
            </a>
          </li>
        ))}
        <li>
          <Link
            to="/admin"
            className="text-xs font-semibold px-4 py-2 rounded-lg"
            style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)', color: 'var(--purple)', textDecoration: 'none' }}
          >
            ⚙ Admin
          </Link>
        </li>
        <li>
          <a
            href="#interest-form"
            onClick={(e) => scrollTo(e, '#interest-form')}
            className="btn-primary text-sm px-5 py-2"
            style={{ textDecoration: 'none' }}
          >
            Apply Now →
          </a>
        </li>
      </ul>

      {/* Mobile menu toggle */}
      <button
        className="md:hidden text-xl"
        style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer' }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 p-4 flex flex-col gap-3"
          style={{ background: 'rgba(3,7,18,0.98)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={(e) => scrollTo(e, l.href)}
              className="text-sm py-2 px-3 rounded-lg"
              style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', background: 'rgba(255,255,255,0.03)' }}>
              {l.label}
            </a>
          ))}
          <Link to="/admin" onClick={() => setMenuOpen(false)}
            className="text-sm py-2 px-3 rounded-lg text-center font-semibold"
            style={{ background: 'rgba(168,85,247,0.15)', color: 'var(--purple)', textDecoration: 'none' }}>
            ⚙ Admin Panel
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
}
