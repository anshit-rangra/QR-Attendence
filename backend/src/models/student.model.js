const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: {
        type: String, 
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true,
    }, 
    course: {
        type: String, 
        required: true
    },
    subjects: {
        type: [String],
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    boss: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref:'admins'
    }
})

const studentModel = mongoose.model("users", userSchema);

module.exports = studentModel;