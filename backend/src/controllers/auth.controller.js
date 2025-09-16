const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const TeacherModel = require("../models/teacher.model");

// One of the main bug is , i am sending a cookie name as role but i am not encrypting that due to time 

const registerUser = async (req, res) => {
  const { rollNo, name, course, subjects, password } = req.body;

  const userExists = await UserModel.findOne({ rollNo });

  if (userExists) {
    return res.status(400).json({message:"User already exists"});
  }

  const hashPassword = await bcrypt.hash(password, 10)

  try {
    const newUser = await UserModel.create({
      rollNo,
      name,
      course,
      subjects,
      password: hashPassword,
    });

    const token = jwt.sign({ rollNo: newUser.rollNo, name: newUser.name }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.cookie("attendanceToken", token, {secure: false})
  res.cookie("role", "student", {secure: false})

    return res.status(201).json({message:"User registered successfully"});

  } catch (error) {
    return res.status(500).json({message:"Error registering user"});
  }
};  

const loginUser = async (req, res) => {
  const { rollNo, password } = req.body;
    const user = await UserModel.findOne({ rollNo }).select("+password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ rollNo: user.rollNo, name: user.name }, process.env.JWT_SECRET, { expiresIn: "30d" });

  res.cookie("attendanceToken", token, {secure: false});
  res.cookie("role", "student", {secure: false})

  return res.status(200).json({ message: "User logged in successfully" });
};

const registerTeacher = async (req, res) => {
  const { id, name, subject, password } = req.body;
  const teacherExists = await TeacherModel.findOne({ id });

  if (teacherExists) {
    return res.status(400).json({ message: "Teacher already exists" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const newTeacher = await TeacherModel.create({
      id,
      name,
      subject,
      password: hashPassword,
    });

    const token = jwt.sign({_id: newTeacher._id, id: newTeacher.id, name: newTeacher.name , role: newTeacher.role, subject: newTeacher.subject }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.cookie("attendanceToken", token , {secure: false});
  res.cookie("role", "teacher", {secure: false})

    return res.status(201).json({ message: "Teacher registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error registering teacher" });
  }
};

const loginTeacher = async (req, res) => { 
  const { id, password } = req.body;
  const teacher = await TeacherModel.findOne({ id }).select("+password");

  if (!teacher) {
    return res.status(404).json({ message: "Teacher not found" });
  }

  const isMatch = await bcrypt.compare(password, teacher.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({_id: teacher._id, id: teacher.id, name: teacher.name , role: teacher.role, subject: teacher.subject }, process.env.JWT_SECRET, { expiresIn: "30d" });

  res.cookie("attendanceToken", token, {secure: false});
  res.cookie("role", "teacher", {secure: false})

  return res.status(200).json({ message: "Teacher logged in successfully" });
};

const logout = async (req, res) => {
  res.clearCookie("attendanceToken");
  return res.status(200).json({ message: "User logged out successfully" });
};

module.exports = {
  registerUser,
  loginUser,
  logout,
  registerTeacher,
  loginTeacher
};
