const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const teacherRoutes = require("./routes/teacher.routes");
const { teacherMiddleware , authMiddleware, adminMiddleware } = require("./middlewares/auth.middleware");
const studentRoutes = require("./routes/student.routes");
const adminRoutes = require("./routes/admin.routes")
const path = require("path")
const mutualRoutes = require("./routes/mutual.routes")



const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());


app.use("/api/auth", authRoutes)
app.use("/api/student", authMiddleware, studentRoutes)
app.use("/api/teacher", teacherMiddleware, teacherRoutes)
app.use("/api/admin/" ,adminMiddleware, adminRoutes)
app.use("/api/mutual/",authMiddleware, mutualRoutes)

app.get("*name", (req, res) => {
    res.sendFile(path.join(__dirname , "../public/index.html"))
})

module.exports = app;