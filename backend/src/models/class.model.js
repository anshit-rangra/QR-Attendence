const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  name:{
    type: String,
    required: true
  },
  ref: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'admins',
    required: true,
  },
}, { timestamps: true });

const ClassModel = mongoose.model('classes', classSchema);

module.exports = ClassModel;
