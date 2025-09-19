const { getKey } = require("../dao/redis.opr");
const AttendanceModel = require("../models/attendance.model");
const studentModel = require("../models/student.model")


const attendanceServe = async (req, res) => {
    const { subject, code, classRef } = req.body;
    const key = await getKey(subject);
    
    const {subjects} = await studentModel.findOne({id: req.user.id})


   if (!subjects.includes(subject)) {
    return res.status(401).json({ message: "User is not registered for this subject" });
}

    
    if(key !== code){
        return res.status(400).json({message:"Invalid QR Code or Expired QR Code"});
    }

    
    // One of the great bug , user can scan multiple time until qr is valid. Fixing that in future 

    
    const response = await AttendanceModel.create({
        studentId: req.user.id,
        name: req.user.name,
        subject,
        status: "present",
        ref: classRef
    });
    
    res.json({message:"Attendance marked successfully", response});
}

const getAttendance = async (req, res) => {
    try {
        
        const attendanceData = await AttendanceModel.find({studentId: req.user.id})
        res.json({attendanceData:attendanceData})
    } catch (error) {
        console.log(error)
        res.json({message: "Error coming when get attendence of user"})
    }
}

module.exports = {
    attendanceServe,
    getAttendance
}