const Course = require('../models/Course');

exports.getAllCourses = async (req, res) => {
  try {
    const { search, category, instructor, sortBy } = req.query;

    let query = {};
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (category) {
      query.category = category;
    }
    if (instructor) {
      query.instructor = { $regex: instructor, $options: 'i' };
    }

    let sortOptions = {};
    if (sortBy === 'price') {
      sortOptions.price = 1;
    } else if (sortBy === 'rating') {
      sortOptions.rating = -1;
    }

    const courses = await Course.find(query).sort(sortOptions);

    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
