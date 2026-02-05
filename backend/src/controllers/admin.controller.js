const ClassModel = require("../models/class.model");
const studentModel = require("../models/student.model");
const TeacherModel = require("../models/teacher.model");


const createClass = async (req, res) => {
    const { code, name } = req.body;

    try {
        const classExists = await ClassModel.findOne({code, ref: req.user._id})
        if(classExists) return res.status(409).json({message: "Class is already exists", class: classExists})

        const createClass = await ClassModel.create({
            code,
            name,
            ref: req.user._id
        })

        res.status(201).json({message: "Subject created sucessfully !", class: createClass})

    } catch (error) {
        console.log(error)
    }
}

const getInfo = async (req, res) => {
    try {
        const [students, teachers, subjects] = await Promise.all([
            studentModel.countDocuments(),
            TeacherModel.countDocuments(),
            ClassModel.countDocuments()
        ])

        res.status(200).json({message:"Detailed fetch sucessfully !", students, teachers, subjects})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = {
    createClass,
    getInfo
}