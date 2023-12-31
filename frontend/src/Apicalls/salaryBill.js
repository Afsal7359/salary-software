import instance from "./axiosinstance";


export const AddSalaryBill = async (payload) =>{
    try {
        const response = await instance.post('salarybill/addsalarybill',payload)
        return response.data
    } catch (error) {
        return error.response.data;
    }
}
export const getallSalarybill = async () =>{
    try {
        const response = await instance.get('salarybill/getallSalarybill')
        return response.data
    } catch (error) {
        return error.response.data;
    }
}

export const DeleteSalaryBill = async(payload)=>{
    try {
        const response = await instance.get(`salarybill/deleteSalarybill/${payload}`)
        return response.data
    } catch (error) {
        return error.response.data;
    }
}

export const EditSalaryBill = async(payload)=>{
    try {
        const response = await instance.post(`salarybill/editSalarybill/${payload._id}`,payload)
        return response.data
    } catch (error) {
        return error.response.data;
    }
}

export const GetSalaryBillCount = async () => {
    try {
        const response = await instance.get('salarybill/getallSalarybillcount');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const GetSalaryByMonth = async (payload) => {
    try {
        const response = await instance.post('salarybill//getSalarybydate',payload);
        return response.data
    } catch (err) {
        return err.response.data;
    }
}