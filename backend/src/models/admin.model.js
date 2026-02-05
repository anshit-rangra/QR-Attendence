const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    center: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true,
        select: false
    }
})

const adminModel = mongoose.model("admins", adminSchema)

module.exports = adminModel;