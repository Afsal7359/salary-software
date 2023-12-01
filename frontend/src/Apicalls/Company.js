import instance from "./axiosinstance";

export const AddCompanyMaster = async (payload) => {
    try {
        const response = await instance.post('company/addcompany', payload);
        return response.data
    } catch (err) {
        return err.response.data;
    }
}