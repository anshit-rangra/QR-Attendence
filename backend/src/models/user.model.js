const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    rollNo: {
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
    }
})

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;