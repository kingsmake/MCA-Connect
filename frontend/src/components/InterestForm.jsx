import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import API from '../api';

const INTEREST_OPTS = ['Very High', 'High', 'Medium', 'Low'];

export default function InterestForm() {
  const [form, setForm] = useState({ name: '', college: '', email: '', phone: '', interestLevel: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.interestLevel) { toast.error('Please select your interest level'); return; }
    setLoading(true);
    try {
      await API.post('/students', form);
      toast.success('Registration submitted! We will contact you soon. 🎉');
      setSubmitted(true);
    } catch (err) {
      const msg = err.response?.data?.error || 'Submission failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="interest-form" className="py-24 px-4" style={{ background: 'linear-gradient(180deg,transparent,rgba(59,130,246,0.04),transparent)' }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity:0,y:30 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true }} className="mb-12 text-center">
          <div className="section-label">Register Interest</div>
          <h2 className="font-syne font-extrabold mb-3" style={{ fontSize:'clamp(1.8rem,4vw,3rem)', letterSpacing:'-1px' }}>
            Take the First Step<br />Towards Your Future
          </h2>
          <div className="section-divider mx-auto" />
          <p className="text-sm leading-relaxed font-light" style={{ color:'rgba(255,255,255,0.5)' }}>
            Fill in your details and our counselor will reach out with personalised guidance.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
            className="glass-card p-12 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="font-syne font-extrabold text-2xl mb-3 gradient-text">You're Registered!</h3>
            <p className="text-sm font-light mb-6" style={{ color:'rgba(255,255,255,0.55)' }}>
              Thanks {form.name.split(' ')[0]}! Our counselor will contact you at {form.email} within 24 hours.
            </p>
            <button className="btn-outline" onClick={() => { setSubmitted(false); setForm({ name:'',college:'',email:'',phone:'',interestLevel:'' }); }}>
              Submit Another
            </button>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity:0,y:30 }} whileInView={{ opacity:1,y:0 }}
            viewport={{ once:true }} transition={{ delay:0.1 }}
            className="glass-card p-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { name:'name',    label:'Full Name *',          type:'text',  placeholder:'Your full name'        },
                { name:'college', label:'Current College *',    type:'text',  placeholder:'Your college name'     },
                { name:'email',   label:'Email Address *',      type:'email', placeholder:'you@example.com'       },
                { name:'phone',   label:'Phone Number *',       type:'tel',   placeholder:'+91 98765 43210'       },
              ].map(f => (
                <div key={f.name} className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium" style={{ color:'rgba(255,255,255,0.55)' }}>{f.label}</label>
                  <input
                    name={f.name} type={f.type} placeholder={f.placeholder}
                    value={form[f.name]} onChange={handleChange} required
                    className="form-input"
                  />
                </div>
              ))}

              {/* Interest Level — full width */}
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-medium" style={{ color:'rgba(255,255,255,0.55)' }}>Interest Level *</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { v:'Very High', icon:'🔥', desc:'Ready to apply' },
                    { v:'High',      icon:'⭐', desc:'Need more info' },
                    { v:'Medium',    icon:'💡', desc:'Exploring'      },
                    { v:'Low',       icon:'🤔', desc:'Just checking'  },
                  ].map(opt => (
                    <button type="button" key={opt.v}
                      onClick={() => setForm(f => ({ ...f, interestLevel: opt.v }))}
                      className="p-3 rounded-xl text-center transition-all duration-200"
                      style={{
                        background: form.interestLevel === opt.v ? 'rgba(0,245,255,0.12)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${form.interestLevel === opt.v ? 'var(--cyan)' : 'rgba(255,255,255,0.08)'}`,
                        color: form.interestLevel === opt.v ? 'var(--cyan)' : 'rgba(255,255,255,0.6)',
                      }}
                    >
                      <div className="text-xl mb-1">{opt.icon}</div>
                      <div className="font-semibold text-xs">{opt.v}</div>
                      <div className="text-xs opacity-60 mt-0.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="sm:col-span-2 text-center mt-2">
                <button type="submit" className="btn-primary text-base px-10 py-4" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Submitting...
                    </span>
                  ) : 'Submit Interest →'}
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
