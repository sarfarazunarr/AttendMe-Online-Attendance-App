const mongoose = require('mongoose');

const AttendenceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  checkin: {
    type: Date,
    default: Date.now(),
    required: true
  },
  checkout: {
    type: Date,
    default: ''
  },
  stayTime: {
    type: String,
    default: ''
  }
});

const Attendence = mongoose.model('attendence', AttendenceSchema);

module.exports = Attendence;
