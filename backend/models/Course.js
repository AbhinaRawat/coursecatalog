const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  instructor: String,
  category: String,
  image: String,
  rating: Number,
  price: Number
});

module.exports = mongoose.model('Course', CourseSchema);
