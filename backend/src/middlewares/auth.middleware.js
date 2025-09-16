const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    
    const token = req.cookies.attendanceToken;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }  

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    next();
}


const teacherMiddleware = (req, res, next) => {
    const token = req.cookies.attendanceToken;
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }  

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { role } = decoded;
        if (role !== 'teacher') {
            return res.status(403).json({ message: "Forbidden" });
        }
        req.user = decoded;
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    next();
    }

module.exports = {
    authMiddleware,
    teacherMiddleware
}