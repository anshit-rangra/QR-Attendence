const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    ref: 'Student',
  },
  subject: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['present', 'absent'],
    default: 'present',
  },
  ref: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'classes',
    required: true,
  }
}, { timestamps: true});

const AttendanceModel = mongoose.model('Attendance', attendanceSchema);

module.exports = AttendanceModel;
