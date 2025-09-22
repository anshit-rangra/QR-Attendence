const studentModel = require("../models/student.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const TeacherModel = require("../models/teacher.model");
const adminModel = require("../models/admin.model");

// One of the main bug is , i am sending a cookie name as role but i am not encrypting that due to time 

const getUser = async (req, res) => {
  const token = req.cookies.attendanceToken || req.cookies.admin
  const tokenData = jwt.verify(token, process.env.JWT_SECRET)
  
  try {
    const user = await studentModel.findOne({ _id: tokenData._id })
      || await TeacherModel.findOne({ _id: tokenData._id }).populate('boss') 
      || await adminModel.findOne({ _id: tokenData._id });

    
    res.json({user})
  } catch (error) {
    console.log(error)
  }
}

const registerStudent = async (req, res) => {
  const { id, name, course, subjects, password } = req.body;

  const userExists = await studentModel.findOne({ id });

  if (userExists) {
    return res.status(400).json({message:"User already exists"});
  }

  const hashPassword = await bcrypt.hash(password, 10)

  try {
    const newUser = await studentModel.create({
      id,
      name,
      course,
      subjects,
      password: hashPassword,
    });

    return res.status(201).json({message:"User registered successfully"});

  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Error registering user"});
  }
};  

const loginUser = async (req, res) => {
  const { id, password } = req.body;
    const user = await studentModel.findOne({ id }).select("+password") || await TeacherModel.findOne({ id }).select("+password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ _id:user._id , id: user.id, name: user.name , role: user.role || "student", subjects: user.subjects }, process.env.JWT_SECRET, { expiresIn: "30d" });

  res.cookie("attendanceToken", token, {secure: false});
  res.cookie("role", (user.role || "student"), {secure: false})

  
  return res.status(200).json({ message: "User logged in successfully" });
};

const registerTeacher = async (req, res) => {
  const { id, name, subjects, password } = req.body;
  const teacherExists = await TeacherModel.findOne({ id });

  if (teacherExists) {
    return res.status(400).json({ message: "Teacher already exists" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const newTeacher = await TeacherModel.create({
      id,
      name,
      subjects,
      password: hashPassword,
    });
    return res.status(201).json({ message: "Teacher registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error registering teacher" });
  }
};


const registerAdmin = async (req, res) => {
  const { email, center, phone, password,  key} = req.body
  if(key !== process.env.ADMIN_LOGIN_KEY){
    return res.status(401).json({message: "Invalid Key"})
  }

  try {

    const adminExists = await adminModel.findOne({email: email})
    if(adminExists){
      return res.status(409).json({message: "Admin already register"})
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const admin = await adminModel.create({email, center, phone, password:hashPassword, role:"admin"})

    const token = jwt.sign({_id: admin._id , email: admin.email, center: admin.center, role:"admin" }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.cookie("admin", token, {secure: false})
    res.cookie("role", "admin", {secure: false})

    res.status(201).json({message: "Admin created sucessfully", admin})
  } catch (error) {
    console.log(error)
    res.json({message: "Try Again error while uploading on database"})
  }
}

const loginAdmin = async (req, res) => {
  const {email, password} = req.body;

  try {
    
    const userExists = await adminModel.findOne({email}).select("+password")
    if(!userExists){
      return res.status(404).json({message:"There is no admin in our database"})
    }
    

    const comparePassword = await bcrypt.compare(password, userExists.password).then(() => {
      const token = jwt.sign({ _id: userExists._id, email: userExists.email, center: userExists.center , role:"admin"}, process.env.JWT_SECRET, { expiresIn: "30d" });

      res.cookie("admin", token, {secure: false})
      res.cookie("role", "admin", {secure: false})

      return res.status(200).json({message: "Admin Logged In Sucessfully"})

    }).catch(() => {
      return res.status(401).json({message: "Password does not match"})
      })

  
  
  } catch (error) {
    res.status(500).json({message:"Server side error"})
  }
}

const logout = async (req, res) => {
  res.clearCookie("attendanceToken");
  return res.status(200).json({ message: "User logged out successfully" });
};

module.exports = {
  registerStudent,
  loginUser,
  logout,
  registerTeacher,
  registerAdmin,
  loginAdmin,
  getUser
};
