import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { QUIZ_QUESTIONS } from '../data';
import API from '../api';

const getResult = (score) => {
  const percentage = score / QUIZ_QUESTIONS.length;

  if (percentage >= 0.75)
    return {
      label: 'Excellent Fit! 🚀',
      emoji: '🎉',
      color: 'rgba(16,185,129,0.85)',
      suggestion: 'Excellent Fit',
      msg: "You have a strong alignment with MCA. You are also ready for CET and admission process."
    };

  if (percentage >= 0.5)
    return {
      label: 'Good Fit ⭐',
      emoji: '💡',
      color: 'rgba(59,130,246,0.85)',
      suggestion: 'Good Fit',
      msg: "You show solid interest and aptitude for MCA. With some preparation and dedication, MCA can be an excellent path."
    };

  return {
    label: 'Explore First 🔍',
    emoji: '🤔',
    color: 'rgba(245,158,11,0.85)',
    suggestion: 'Explore First',
    msg: "MCA might need more exploration. Attend a counseling session to understand better."
  };
};

export default function Quiz() {
  const [current, setCurrent]   = useState(0);
  const [answers, setAnswers]   = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore]       = useState(0);
  const [done, setDone]         = useState(false);
  const [name, setName]         = useState('');

  const q = QUIZ_QUESTIONS[current];
  const progress = ((current + 1) / QUIZ_QUESTIONS.length) * 100;

  const handleSelect = (i) => setSelected(i);

  const handleNext = () => {
    if (selected === null) { toast.error('Please select an answer'); return; }
    if (current === 0 && name.trim() === '') {
      toast.error('Name must be at least 3 characters');
      return;
    }
    const point = q.scores ? q.scores[selected] : (selected <= 1 ? 1 : 0);
    const newScore = score + point;

    const newAnswers = [...answers, selected];

    if (current + 1 >= QUIZ_QUESTIONS.length) {
      setScore(newScore);
      setAnswers(newAnswers);
      setDone(true);

      const res = getResult(newScore);

    API.post('/quiz', {
      name: name,
      score: newScore,
      answers: newAnswers,
      suggestion: res.suggestion
    }).catch(() => {});
  } else {
    setScore(newScore);
    setAnswers(newAnswers);
    setCurrent(c => c + 1);
    setSelected(null);
  }
};

  const reset = () => { setCurrent(0); setAnswers([]); setSelected(null); setScore(0); setDone(false); };

  const result = getResult(score);

  return (
    <section id="quiz" className="py-24 px-4" style={{ background: 'linear-gradient(180deg,transparent,rgba(236,72,153,0.03),transparent)' }}>
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity:0,y:30 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true }} className="mb-12 text-center">
          <div className="section-label">Self Assessment</div>
          <h2 className="font-syne font-extrabold mb-3" style={{ fontSize:'clamp(1.8rem,4vw,3rem)', letterSpacing:'-1px' }}>
            Is MCA Right for You?
          </h2>
          <div className="section-divider mx-auto" />
          <p className="text-sm leading-relaxed font-light" style={{ color:'rgba(255,255,255,0.5)' }}>
            Answer few quick questions
          </p>
        </motion.div>

        <motion.div className="glass-card p-8" initial={{ opacity:0,y:30 }}
          whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}>
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div key={current} initial={{ opacity:0,x:20 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-20 }} transition={{ duration:0.3 }}>
                {/* Progress */}
                <div className="h-0.5 rounded-full overflow-hidden mb-6" style={{ background:'rgba(255,255,255,0.08)' }}>
                  <motion.div className="h-full rounded-full" style={{ background:'linear-gradient(90deg,var(--cyan),var(--purple))', boxShadow:'0 0 10px var(--cyan)' }}
                    animate={{ width: `${progress}%` }} transition={{ duration:0.4 }} />
                </div>

                <div className="font-mono text-xs mb-3 tracking-widest" style={{ color:'var(--muted)' }}>
                  QUESTION {current + 1} OF {QUIZ_QUESTIONS.length}
                </div>
                <h3 className="font-syne font-bold text-xl mb-6 leading-snug">{q.q}</h3>

                {/* Name input on first question */}
                {current === 0 && (
                  <input className="form-input mb-4" placeholder="Enter your name *" value={name}
                    onChange={e => setName(e.target.value)} />
                )}

                <div className="flex flex-col gap-3 mb-8">
                  {q.opts.map((opt, i) => (
                    <button key={i} className={`quiz-option ${selected === i ? 'selected' : ''}`}
                      onClick={() => handleSelect(i)}>
                      <span className="font-mono text-xs mr-3 opacity-50">{String.fromCharCode(65+i)}.</span>
                      {opt}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color:'var(--muted)' }}>
                    {selected !== null ? '✓ Option selected' : 'Select an option to continue'}
                  </span>
                  <button className="btn-primary" onClick={handleNext} disabled={selected === null}>
                    {current + 1 === QUIZ_QUESTIONS.length ? 'See Results ✨' : 'Next →'}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
                transition={{ duration:0.4 }} className="text-center py-4">
                <div className="text-5xl mb-4">{result.emoji}</div>
                <div className="font-syne font-extrabold" style={{ fontSize:'clamp(1rem,3vw,1.2rem)', marginBottom:'0.5rem' }}>Your Result</div>
                <div className="font-syne font-extrabold mb-3 gradient-text" style={{ fontSize:'clamp(2.5rem,6vw,4rem)' }}>
                  {Math.round((score / QUIZ_QUESTIONS.length) * 100)}% 
                    <span className="text-sm ml-2 opacity-60">
                      ({score.toFixed(1)}/{QUIZ_QUESTIONS.length})
                    </span>
                </div>
                <span className="inline-block px-5 py-2 rounded-full font-bold text-sm mb-4"
                  style={{ background: result.color.replace('0.85','0.15'), border:`1px solid ${result.color}`, color:'#fff' }}>
                  {result.label}
                </span>
                <p className="text-sm leading-relaxed max-w-sm mx-auto mb-8 font-light" style={{ color:'rgba(255,255,255,0.6)' }}>
                  {result.msg}
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <button className="btn-primary" onClick={() => document.querySelector('#interest-form')?.scrollIntoView({ behavior:'smooth' })}>
                    Register Interest →
                  </button>
                  <a 
                    href="https://forms.gle/wJXoJisgkDuVRpFr7"
                    target="_blank"
                    className="btn-outline"
                  >
                    ⚡ Instant Registration →
                  </a>
                  <button className="btn-outline" onClick={reset}>Retake Quiz</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
