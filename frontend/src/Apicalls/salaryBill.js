import instance from "./axiosinstance";


export const AddSalaryBill = async (payload) =>{
    try {
        const response = await instance.post('salarybill/addsalarybill',payload)
        return response.data
    } catch (error) {
        return error.response.data;
    }
}