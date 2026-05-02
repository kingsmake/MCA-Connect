export const CAREER_DATA = [
  {
    id: 'ai',
    icon: '🤖',
    title: 'AI Engineer',
    sub: 'Machine Learning & AI',
    salary: '₹8–28 LPA',
    growth: '🚀 Explosive growth, 40% YoY demand increase',
    companies: 'Google, OpenAI, TCS, Wipro, Infosys, Persistent',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'ML', 'Deep Learning', 'NLP', 'Computer Vision', 'Statistics'],
    color: 'cyan',
  },
  {
    id: 'ds',
    icon: '📊',
    title: 'Data Scientist',
    sub: 'Analytics & Insights',
    salary: '₹7–24 LPA',
    growth: '📈 Top 5 emerging jobs globally, 35% growth',
    companies: 'Amazon, Flipkart, Deloitte, Accenture, Nielsen',
    skills: ['Python', 'R', 'SQL', 'Pandas', 'Visualization', 'Statistics', 'Big Data', 'Spark'],
    color: 'purple',
  },
  {
    id: 'fs',
    icon: '💻',
    title: 'Full Stack Developer',
    sub: 'Web & App Development',
    salary: '₹6–22 LPA',
    growth: '⚡ 25% growth, highest absolute hiring volume',
    companies: 'Startup ecosystem, FAANG, Product companies',
    skills: ['React', 'Node.js', 'MongoDB', 'SQL', 'REST APIs', 'Git', 'Docker', 'AWS'],
    color: 'blue',
  },
  {
    id: 'cloud',
    icon: '☁️',
    title: 'Cloud Architect',
    sub: 'AWS / Azure / GCP',
    salary: '₹10–35 LPA',
    growth: '🌐 Critical infrastructure role, 30% growth',
    companies: 'Microsoft, Amazon, IBM, Cognizant, Capgemini',
    skills: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'DevOps', 'Terraform', 'Linux'],
    color: 'cyan',
  },
  {
    id: 'cyber',
    icon: '🛡️',
    title: 'Cybersecurity Analyst',
    sub: 'Security & Compliance',
    salary: '₹8–26 LPA',
    growth: '🔐 Critical talent shortage, 40% demand growth',
    companies: 'ISRO, DRDO, Banks, Big4 Consulting, CERT-In',
    skills: ['Network Security', 'Ethical Hacking', 'SIEM', 'Cryptography', 'Compliance', 'CEH', 'CISSP'],
    color: 'pink',
  },
  {
    id: 'pm',
    icon: '📱',
    title: 'Product Manager',
    sub: 'Tech Product Strategy',
    salary: '₹12–40 LPA',
    growth: '🌟 Fastest growing leadership role in tech',
    companies: 'Paytm, CRED, Swiggy, Zomato, Razorpay, PhonePe',
    skills: ['Roadmapping', 'Agile', 'UX Research', 'Analytics', 'SQL', 'Jira', 'A/B Testing'],
    color: 'green',
  },
];

export const QUIZ_QUESTIONS = [
  {
  q: 'How do you feel about writing code and solving programming problems?',
  opts: [
    'Love it — I can do it for hours',
    "It's interesting, I want to learn more",
    "It's okay, not my favourite",
    'Not really my thing',
  ],
  scores: [1, 0.8, 0.3, 0]
  },
  {
  q: 'Which of these activities excites you the most?',
  opts: [
    'Building apps or websites',
    'Analyzing data to find patterns',
    'Designing and securing systems',
    'Managing and leading tech teams',
  ],
  scores: [1, 0.9, 0.8, 0.6]
  },
  {
   q: 'How comfortable are you with mathematics and logical reasoning?',
   opts: [
     'Very comfortable — love logical problems',
     'Comfortable with the basics',
     'Somewhat comfortable, with effort',
     'Not very comfortable',
    ],
   scores: [1, 0.8, 0.5, 0]
  },
  {
    q: 'What best describes your career goal?',
    opts: [
      'High-paying tech job at MNC or startup',
      'Research and innovation in technology',
      'Entrepreneurship and building startups',
      'Government or PSU tech roles',
    ],
    scores: [1, 0.9, 0.8, 0.7]
  },
  {
    q: 'Are you willing to invest 2 focused years for advanced tech specialization?',
    opts: [
      "Absolutely — it's a worthwhile investment",
      'Yes, if the outcome is clearly good',
      'Possibly, I need more information',
      "Not sure about the commitment",
    ],
    scores: [1, 0.8, 0.5, 0]
  },
  {
  q: "Have you appeared for MCA CET or planning to appear?",
  opts: [
    "Yes, already appeared",
    "Planning to appear",
    "Not yet, but interested",
    "No"
  ],
  scores: [1, 1, 0.5, 0]
},
{
  q: "What is your academic background?",
  opts: [
    "Computer Science / IT",
    "BCA",
    "Commerce / Science",
    "Other"
  ],
  scores: [1, 1, 0.6, 0.4]
},
{
  q: "How interested are you in pursuing MCA?",
  opts: [
    "Highly interested",
    "Interested",
    "Not sure",
    "Not interested"
  ],
  scores: [1, 0.8, 0.4, 0]
},
{
  q: "Do you have a clear career goal in technology?",
  opts: [
    "Yes, very clear",
    "Somewhat clear",
    "Still exploring",
    "Not sure"
  ],
  scores: [1, 0.7, 0.4, 0]
},
];

export const WHY_CARDS = [
  { icon: '🚀', title: 'High-Demand Careers',      text: 'Technology jobs are growing 15% faster than any other industry. MCA graduates are preferred for top-tier tech roles globally.',        tag: '15% faster growth',  color: 'cyan'   },
  { icon: '📈', title: 'Industry Growth',           text: "India's IT sector is a $250B+ economy. MCA skills in AI, Cloud, and Full-Stack are critical pillars of this expansion.",           tag: '$250B+ IT sector',   color: 'purple' },
  { icon: '💼', title: 'Internship Opportunities',  text: 'Partnered with 150+ companies for mandatory internships — gain real-world experience before graduation day.',                        tag: '150+ partners',      color: 'green'  },
  { icon: '🎓', title: 'Advanced Curriculum',       text: 'A curriculum co-designed with industry leaders — covering AI/ML, cloud computing, cybersecurity, and modern full-stack development.', tag: 'Industry-aligned',   color: 'pink'   },
  { icon: '🌐', title: 'Global Recognition',        text: 'MCA degree recognized worldwide. Alumni placed in Google, Microsoft, Amazon, TCS, Infosys, and 100+ MNCs.',                          tag: 'MNC placements',     color: 'blue'   },
  { icon: '⚡', title: 'Research & Innovation',     text: 'Active research labs in AI, Data Science and IoT. Students publish papers in IEEE, ACM, and Springer journals.',                    tag: 'Research labs',      color: 'yellow' },
];

export const TIMELINE_STEPS = [
  { step: '01', icon: '🎯', title: 'Admission & Orientation',       desc: 'Join through NIMCET or university entrance exam. Orientation week explores labs, clubs, and mentorship programs.' },
  { step: '02', icon: '📚', title: 'Core Foundation (Sem 1–2)',     desc: 'Mastering Data Structures, DBMS, OOP, Web Technologies, and Discrete Mathematics — building your technical backbone.' },
  { step: '03', icon: '🔬', title: 'Advanced Specialization (Sem 3)', desc: 'Choose specializations: AI/ML, Full-Stack, Cloud Computing, or Cybersecurity. Work on real projects with industry mentors. From Semester 3, students get early placement exposure as reputed companies start visiting the campus.' },
  { step: '04', icon: '🏢', title: 'Industry Internship',           desc: '6-month mandatory internship at top companies. Real-world problem solving, live projects, and professional mentorship.' },
  { step: '05', icon: '🏆', title: 'Placement & Beyond',            desc: 'Dedicated placement cell, mock interviews, resume workshops, and direct interactions with 150+ recruiters. Start your dream career!' },
];

export const DEFAULT_VIDEOS = [
  { _id: '1', title: 'MCA Department Overview',           description: '5 min • Department Tour',        emoji: '🎓' },
  { _id: '2', title: 'Alumni Success Stories',            description: '12 min • Career Journeys',       emoji: '🏆' },
  { _id: '3', title: 'Campus Life at MCA',                description: '8 min • Student Experiences',    emoji: '🌟' },
  { _id: '4', title: 'Placement Cell Activities',         description: '6 min • Recruitment Drive',      emoji: '💼' },
  { _id: '5', title: 'Research & Innovation Lab',         description: '10 min • Lab Showcase',          emoji: '🔬' },
  { _id: '6', title: 'MCA vs MCS vs MBA — What to Choose?', description: '15 min • Career Guidance',    emoji: '📊' },
];
