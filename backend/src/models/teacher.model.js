const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    subjects: { type: [String], required: true },
    role: { type: String, default: 'teacher' },
    boss: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admins"
    }
})

const TeacherModel = mongoose.model("Teacher", teacherSchema);

module.exports = TeacherModel;