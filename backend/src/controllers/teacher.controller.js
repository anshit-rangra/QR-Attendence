const QRCode = require("qrcode");
const {v4 : uuidv4} = require("uuid");
const { setKey } = require("../dao/redis.opr");
const classModel = require("../models/class.model");
const AttendanceModel = require("../models/attendance.model");

const generateQR = async (req, res) => {

  const subject = req.user.subject;
   const code = uuidv4();

  if (!subject) {
    return res.status(400).json({ message: "Subject not found in token" });
  }

  try {

    let  response = await classModel.findOne({ code: subject });
    if(!response){
      response = await classModel.create({
      code: subject,
      ref: req.user._id
    })  // create class in mongodb database
  }
     
  
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

const getClassAttendance = async (req, res) => {
try {
  const {_id} = await classModel.findOne({code: req.user.subject})
  const classData = await AttendanceModel.find({ref: _id})

  return res.json({classData: classData})
} catch (error) {
  console.log(error)
  res.json({message: "Error comes here"})
}
}

module.exports = {
  generateQR,
  getClassAttendance
};

