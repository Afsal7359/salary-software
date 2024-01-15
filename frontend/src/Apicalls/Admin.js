import instance from "./axiosinstance";

export const AddAdmins = async(payload) => {
    try {
        const response = await instance.post('admin/add-admin',payload)
        return response.data
    } catch (error) {
        return error.response.data;
    }
}