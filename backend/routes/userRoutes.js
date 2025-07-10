const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');

// GET all users - for testing only
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


// GET enrolled courses
router.get('/:userId/enrollments', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('enrolledCourses.course');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.enrolledCourses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
router.get('/testuser/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST enroll
// POST enroll
router.post('/:userId/enroll', async (req, res) => {
  try {
    const { courseId } = req.body;
    console.log('Enroll called with userId:', req.params.userId);
    console.log('Course ID:', courseId);

    const user = await User.findById(req.params.userId);
    if (!user) {
      console.log('User not found for id:', req.params.userId);
      return res.status(404).json({ error: 'User not found' });
    }

    const alreadyEnrolled = user.enrolledCourses.find(c => c.course.toString() === courseId);
    if (alreadyEnrolled) {
      console.log('Already enrolled. Skipping.');
    } else {
      user.enrolledCourses.push({ course: courseId, progress: 0 });
      await user.save();
      console.log('Enrolled successfully.');
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Error enrolling user:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update progress
router.put('/:userId/progress', async (req, res) => {
  const { courseId, progress } = req.body;

  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const courseEntry = user.enrolledCourses.find(c => c.course.toString() === courseId);
    if (!courseEntry) return res.status(404).json({ error: 'Course not enrolled' });

    courseEntry.progress = progress;
    await user.save();

    res.json({ success: true, progress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


// POST unenroll
router.post('/:userId/unenroll', async (req, res) => {
  try {
    const { courseId } = req.body;
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.enrolledCourses = user.enrolledCourses.filter(c => c.course.toString() !== courseId);
    await user.save();

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
