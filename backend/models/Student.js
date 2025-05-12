const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  classNumber:{
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Student', studentSchema);
