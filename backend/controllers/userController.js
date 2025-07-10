const User = require('../models/User');
const Course = require('../models/Course');

exports.enroll = async (req, res) => {
  const { userId, courseId } = req.body;

  const user = await User.findById(userId);
  const course = await Course.findById(courseId);

  if (!user || !course) return res.status(404).json({ message: 'Not found' });

  const alreadyEnrolled = user.enrolledCourses.some(en => en.course.toString() === courseId);
  if (alreadyEnrolled) return res.status(400).json({ message: 'Already enrolled' });

  user.enrolledCourses.push({ course: courseId });
  await user.save();

  res.json({ message: 'Enrolled successfully', user });
};

exports.unenroll = async (req, res) => {
  const { userId, courseId } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.enrolledCourses = user.enrolledCourses.filter(en => en.course.toString() !== courseId);
  await user.save();

  res.json({ message: 'Unenrolled successfully', user });
};

exports.getUserCourses = async (req, res) => {
  const user = await User.findById(req.params.id).populate('enrolledCourses.course');
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json(user.enrolledCourses);
};
