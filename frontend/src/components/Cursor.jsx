import { useEffect, useRef } from 'react';

export default function Cursor() {
  const curRef  = useRef(null);
  const ringRef = useRef(null);
  const rx = useRef(0), ry = useRef(0);
  const mx = useRef(0), my = useRef(0);

  useEffect(() => {
    const onMove = (e) => {
      mx.current = e.clientX;
      my.current = e.clientY;
      if (curRef.current) {
        curRef.current.style.left  = e.clientX - 6 + 'px';
        curRef.current.style.top   = e.clientY - 6 + 'px';
      }
    };
    document.addEventListener('mousemove', onMove);

    const animate = () => {
      rx.current += (mx.current - rx.current) * 0.12;
      ry.current += (my.current - ry.current) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx.current - 18 + 'px';
        ringRef.current.style.top  = ry.current - 18 + 'px';
      }
      requestAnimationFrame(animate);
    };
    const af = requestAnimationFrame(animate);

    const grow = () => {
      if (curRef.current)  curRef.current.style.transform  = 'scale(2)';
      if (ringRef.current) { ringRef.current.style.width = '50px'; ringRef.current.style.height = '50px'; }
    };
    const shrink = () => {
      if (curRef.current)  curRef.current.style.transform  = 'scale(1)';
      if (ringRef.current) { ringRef.current.style.width = '36px'; ringRef.current.style.height = '36px'; }
    };
    document.querySelectorAll('a,button,.glass-card,.quiz-option,.career-card').forEach(el => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(af);
    };
  }, []);

  return (
    <>
      <div id="cursor"      ref={curRef}  />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}
