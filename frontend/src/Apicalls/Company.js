import instance from "./axiosinstance";

export const AddCompanyMaster = async (payload) => {
    try {
        const response = await instance.post('company/addcompany', payload);
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const GetAllCompany = async()=>{
    try {
        const response = await instance.get('company/getallcompany');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
export const EditCompany = async(payload)=>{
    try {
        const response = await instance.put(`company/editcompany/${payload._id}`, payload);
        return response.data
    } catch (error) {
        return error.response.data
    }
}