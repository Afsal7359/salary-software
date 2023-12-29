import instance from "./axiosinstance";

export const GetPFReport = async(payload)=>{
    try {
        const response = await instance.post('report/pfreport',payload);
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const GetESIReport = async(payload)=>{
    try {
        const response = await instance.post('report/esireport',payload);
        return response.data
    } catch (error) {
        return error.response.data
    }
}