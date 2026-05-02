import { useEffect } from 'react';

export default function ScrollProgress() {
  useEffect(() => {
    const el = document.getElementById('scroll-progress');
    const onScroll = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (el) el.style.width = pct + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div id="scroll-progress" />;
}
