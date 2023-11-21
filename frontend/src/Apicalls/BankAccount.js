import instance from './axiosinstance'


export const AddbankAccount = async (payload) => {
    try {
        const response = await instance.post('BankAccount/addbankaccount', payload);
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const getallbankAccount = async () => {
    try {
        const response = await instance.get('BankAccount/getallbankaccount');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}
export const editbankAccount = async (payload) => {
    try {
      // Make a PUT request to edit the employeetype
      const response = await instance.put(`BankAccount/editbankaccount/${payload._id}`, payload);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };

  export const deletebankaAccount = async (payload) => {
    try {
      // Make a PUT request to edit the employeetype
      const response = await instance.delete(`BankAccount/deletebankaccount/${payload}`);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };