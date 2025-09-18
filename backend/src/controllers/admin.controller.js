const ClassModel = require("../models/class.model");


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

module.exports = {
    createClass
}