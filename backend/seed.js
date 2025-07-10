// backend/seed.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Course = require('./models/Course');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/courseCatalog';

const seedCourses = [
  {
    title: 'Angular Basics',
    description: 'Learn the fundamentals of Angular.',
    instructor: 'Levinsci Amin',
    category: 'Programming',
    rating: 4.5,
    price: 100,


  },
  {
    title: 'React Advanced',
    description: 'Advanced concepts in React development.',
    instructor: 'Abhina Rawat',
    category: 'Programming',
    rating: 4.7,
    price: 150,
  },
  {
    title: 'UI/UX Design',
    description: 'Master the principles of good design.',
    instructor: 'Abin Ray',
    category: 'Design',
    rating: 4.3,
    price: 120,

  }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');
    await Course.deleteMany({});
    await Course.insertMany(seedCourses);
    console.log('Seed data inserted');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('MongoDB error', err);
    process.exit(1);
  });
