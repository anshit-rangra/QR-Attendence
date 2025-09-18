const QRCode = require("qrcode");
const {v4 : uuidv4} = require("uuid");
const { setKey, deleteKey } = require("../dao/redis.opr");
const classModel = require("../models/class.model");
const AttendanceModel = require("../models/attendance.model");
const studentModel = require("../models/student.model");
const ClassModel = require("../models/class.model");

const generateQR = async (req, res) => {

  const subject = req.query.code
   const code = uuidv4();

  if (!subject) {
    return res.status(400).json({ message: "Subject not found in token" });
  }

  try {

    const  response = await classModel.findOne({ code: subject });
        
  
    const payload = {
      subject,
      code, 
      classRef: response._id
    };

    // object ko QR me encode kar do
    const qrImage = await QRCode.toDataURL(JSON.stringify(payload));

    await setKey(subject, code) // redis me store kar do

    return res.status(201).json({ qrImage });
 
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Error generating QR code" });
  }
};

const deleteQR = async (req, res) => {
  const qrCode = req.query.code;

  try {
    const students = await studentModel.find({subjects:qrCode})
    
const currentDate = new Date(); // abhi ka time
const tenMinutesAgo = new Date(currentDate.getTime() - 10 * 60 * 1000);

const presentStudents = await AttendanceModel.find({
  subject: qrCode,
  date: { $gte: tenMinutesAgo, $lte: currentDate },
  status: 'present'
});

const presentIds = presentStudents.map(s => s.studentId.toString());


// 4. Filter absent students (all details remain intact)
const absentStudents = students.filter(stu => {
  return !presentIds.includes(stu.id)

})


const klass = await classModel.findOne({ code: qrCode })


const absentsData = absentStudents.map((student) => {
  return { studentId : student.id, name: student.name , subject: qrCode, status: 'absent', ref: klass._id }
})

    
     await deleteKey(qrCode)
    
    await AttendanceModel.insertMany(absentsData)

    res.status(200).json({message: "Key deleted sucessfully"})
  } catch (error) {
    console.log(error)
  }
}

const getClassAttendance = async (req, res) => {
  const subject = req.query.code || ""
  
try {
  const {_id} = await classModel.findOne({code: subject}) 
 
  const classData = await AttendanceModel.find({ref: _id})

  return res.json({classData: classData})
} catch (error) {
  console.log(error)
  res.json({message: "There is no class"})
}
}

module.exports = {
  generateQR,
  getClassAttendance,
  deleteQR
};

