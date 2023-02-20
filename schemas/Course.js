const mongoose = require('mongoose');
// const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  instructor: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  semester: {
    type: String,
    required: true
  }
});

mongoose.model("Course", courseSchema);

