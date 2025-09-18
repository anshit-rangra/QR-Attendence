import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://qr-attendence-by5k.onrender.com/api/',
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
})

export const registerStudent = async (data) => {
    try {
    const response = await instance.post("/admin/student/register", data, { withCredentials: true })
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
        return response
    }
}

export const registerTeacher = async (data) => {
    try {
    const response = await instance.post("/admin/teacher/register", data, { withCredentials: true })
    return response
        
    } catch (error) {
        const {response } = error;
        return response.data
    }
}



export const getClass = async (subject) => {
    try {
        const response = await instance.get(`/teacher/get-class?code=${subject}`,{}, {withCredentials: true})
        return response
    } catch (error) {
        const {response} = error;
        return response.data
    }
}

export const getUser = async () => {
    try {
        const response = await instance.get("/auth/getuser",{}, {withCredentials: true})
        return response
    } catch (error) {
        const {response} = error;
        return response
    }
}

export const generateQR = async (subject) => {
    try {
        const response = await instance.get(`/teacher/generate-qr?code=${subject}`,{}, {withCredentials: true})
        return response
    } catch (error) {
        const {response} = error;
        return response.data
    }
}

export const deleteQR = async (code) => {
    try {
        const response = await instance.post(`/teacher/delete-qr?code=${code}`,{}, {withCredentials: true})
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


export const adminLogin = async (data) => {
    try {
        const response = await instance.post('/auth/admin/login', data, {withCredentials: true})
        return response
    } catch (error) {
        const {response} = error;
        return response
    }
}

export const createSubject = async (data) => {
    try {
        const response = await instance.post('/admin/create/class', data, {withCredentials: true})
        return response
    } catch (error) {
        const {response} = error;
        return response
    }
}