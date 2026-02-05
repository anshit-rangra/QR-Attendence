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
    const token = req.cookies.attendanceToken || req.cookies.admin

    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }  

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { role } = decoded;
        
        if (role === 'teacher' || role === 'admin') {
            req.user = decoded;
        } else {
            return res.status(403).json({ message: "Forbidden" });
        }
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    next();
    }

const adminMiddleware = (req, res, next) => {
    const token = req.cookies.admin;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }  

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const { role } = decoded;
        if (role !== 'admin') {
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
    teacherMiddleware,
    adminMiddleware
}