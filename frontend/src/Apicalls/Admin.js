import instance from "./axiosinstance";

export const AddAdmins = async(payload) => {
    try {
        const response = await instance.post('admin/add-admin',payload)
        return response.data
    } catch (error) {
        return error.response.data;
    }
}

export const GetAllAdmin = async() =>{
    try {
        const response = await instance.get('admin/get-admin')
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const LoginAdmin = async(payload) =>{
    try {
        const response = await instance.post('admin/login',payload)
        return response.data
    } catch (error) {
        return error.response.data
    }
}