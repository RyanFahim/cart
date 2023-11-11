// models/course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  types: {
    type: [String],
    enum: ['education', 'skill', 'academic'],
  },
  category: {
    type: String,
    enum: ['Live course', 'Recorded course'],
  },
  details: {
    type: String,
  },
  price: {
    type: Number,
  },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
