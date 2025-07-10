const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
    email: String,

  enrolledCourses: [{
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    progress: { type: Number, default: 0 }
  }]
});

module.exports = mongoose.model('User', UserSchema);
