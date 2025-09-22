const ClassModel = require("../models/class.model")
const mongoose = require("mongoose")


const getsubjects = async (req, res) => {
    const id = req.params.id;
    let subjects = req.query.subjects;
    subjects = JSON.parse(subjects)
    
    
    try {
        
        const classes = await ClassModel.find({ref:id, code : {$in: subjects}})
        
        if(!classes) return res.status(401).json({message:"Nothing found"})
        res.json({subjects:classes})
    } catch (error) {
        console.log(error)
        res.json({message:"Error while fetching subject"})
    }
}

module.exports = {
    getsubjects
}