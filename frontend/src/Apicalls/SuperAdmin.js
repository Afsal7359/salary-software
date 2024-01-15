import instance from "./axiosinstance"

export const SuperAdminlogin = async(payload)=>{
    try {
        const response = await instance.post('SuperAdmin/login',payload);
        return response.data
    } catch (error) {
        return error.data
    }
}