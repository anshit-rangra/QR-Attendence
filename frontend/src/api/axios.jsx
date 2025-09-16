import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
})

export const registerUser = async (data) => {
    try {
    const response = await instance.post("/auth/user/register", data, { withCredentials: true })
    return response
        
    } catch (error) {
        const {response } = error;
        return response.data
    }
}

export const loginUser = async (data) => {
    try {
    const response = await instance.post("/auth/user/login", data, { withCredentials: true })
    return response
        
    } catch (error) {
        const {response } = error;
        return response.data
    }
}

export const registerTeacher = async (data) => {
    try {
    const response = await instance.post("/auth/teacher/register", data, { withCredentials: true })
    return response
        
    } catch (error) {
        const {response } = error;
        return response.data
    }
}

export const loginTeacher = async (data) => {
    try {
    const response = await instance.post("/auth/teacher/login", data, { withCredentials: true })
    return response
        
    } catch (error) {
        const {response } = error;
        return response.data
    }
}

export const getClass = async () => {
    try {
        const response = await instance.get("/teacher/get-class",{}, {withCredentials: true})
        return response
    } catch (error) {
        const {response} = error;
        return response.data
    }
}

export const generateQR = async () => {
    try {
        const response = await instance.get("/teacher/generate-qr",{}, {withCredentials: true})
        return response
    } catch (error) {
        const {response} = error;
        return response.data
    }
}

export const attendClass = async (data) => {
    try {
        const response = await instance.post('/student/mark-attendance', data, {withCredentials: true})
        return response
    } catch (error) {
        const {response} = error;
        return response.data
    }
}

export const attendClasses = async () => {
    try {
        const response = await instance.get('/student/get-attendance', {}, {withCredentials: true})
        return response
    } catch (error) {
        const {response} = error;
        return response.data
    }
}