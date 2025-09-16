const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    subject: { type: String, required: true },
    role: { type: String, default: 'teacher' }
})

const TeacherModel = mongoose.model("Teacher", teacherSchema);

module.exports = TeacherModel;