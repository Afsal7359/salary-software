import instance from './axiosinstance'


export const Addbank = async (payload) => {
    try {
        const response = await instance.post('bank/addbank', payload);
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const getallbank = async () => {
    try {
        const response = await instance.get('bank/getallbank');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}
export const editbank= async (payload) => {
    try {
      // Make a PUT request to edit the employeetype
      const response = await instance.put(`bank/editbank/${payload._id}`, payload);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };

  export const deletebank = async (payload) => {
    try {
      // Make a PUT request to edit the employeetype
      const response = await instance.delete(`bank/deletebank/${payload}`);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };