/**
 * Seed script — populates the database with sample data
 * Run: node seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Student    = require('./models/Student');
const QuizResult = require('./models/QuizResult');
const Post       = require('./models/Post');
const Video      = require('./models/Video');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  // Clear existing
  await Promise.all([Student.deleteMany(), QuizResult.deleteMany(), Post.deleteMany(), Video.deleteMany()]);
  console.log('🧹 Cleared existing data');

  // Students
  await Student.insertMany([
    { name:'Aditya Sharma',  college:'St. Xavier\'s College',    email:'aditya@example.com',  phone:'9876543210', interestLevel:'Very High' },
    { name:'Priya Patel',    college:'KC College Mumbai',        email:'priya@example.com',   phone:'9876543211', interestLevel:'High'      },
    { name:'Rohit Mehta',    college:'Jai Hind College',         email:'rohit@example.com',   phone:'9876543212', interestLevel:'Medium'    },
    { name:'Sneha Gupta',    college:'Mithibai College',         email:'sneha@example.com',   phone:'9876543213', interestLevel:'Very High' },
    { name:'Karan Singh',    college:'Ramnarain Ruia College',   email:'karan@example.com',   phone:'9876543214', interestLevel:'High'      },
  ]);
  console.log('✅ Seeded 5 students');

  // Quiz results
  await QuizResult.insertMany([
    { name:'Aditya Sharma', score:5, suggestion:'Excellent Fit', answers:[0,0,0,0,0] },
    { name:'Priya Patel',   score:3, suggestion:'Good Fit',      answers:[0,1,0,1,0] },
    { name:'Rohit Mehta',   score:1, suggestion:'Explore First', answers:[2,2,2,2,2] },
  ]);
  console.log('✅ Seeded quiz results');

  // Posts
  await Post.insertMany([
    { title:'MCA Connect Campaign 2024 Launched!',       content:'We are excited to launch the MCA Connect digital outreach campaign for 2024. Visit colleges, scan QR codes, and learn about our program.', category:'Announcement' },
    { title:'Campus Placement Drive Results',            content:'Proud to announce 94% placement rate for MCA 2024 batch. 150+ companies participated in our placement drive.', category:'Achievement' },
    { title:'New AI Lab Inaugurated',                    content:'Our state-of-the-art Artificial Intelligence research lab has been inaugurated. Students can now work on real ML projects.', category:'News' },
    { title:'Applications Open for MCA 2025',           content:'Applications are now open for MCA 2025 intake. Apply online or visit the campus for more information.', category:'Update' },
  ]);
  console.log('✅ Seeded posts');

  // Videos
  await Video.insertMany([
    { title:'MCA Department Overview',           description:'5 min • Department Tour',        category:'Overview',   videoUrl:'' },
    { title:'Alumni Success Stories',            description:'12 min • Career Journeys',       category:'Alumni',     videoUrl:'' },
    { title:'Campus Life at MCA',                description:'8 min • Student Experiences',    category:'Campus',     videoUrl:'' },
    { title:'Placement Cell Activities',         description:'6 min • Recruitment Drive',      category:'Placement',  videoUrl:'' },
    { title:'Research & Innovation Lab',         description:'10 min • Lab Showcase',          category:'Research',   videoUrl:'' },
    { title:'MCA vs MCS vs MBA Comparison',      description:'15 min • Career Guidance',       category:'Overview',   videoUrl:'' },
  ]);
  console.log('✅ Seeded videos');

  console.log('\n🎉 Seed complete!');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
