import instance from './axiosinstance'


export const AddAccountType = async (payload) => {
    try {
        const response = await instance.post('accounttype/addaccounttype', payload);
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const getallAccountType = async () => {
    try {
        const response = await instance.get('accounttype/getallaccounttype');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}
export const editAccountType= async (payload) => {
    try {
      // Make a PUT request to edit the employeetype
      const response = await instance.put(`accounttype/editaccounttype/${payload._id}`, payload);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };

  export const deleteAccountType = async (payload) => {
    try {
      // Make a PUT request to edit the employeetype
      const response = await instance.delete(`accounttype/deleteaccounttype/${payload}`);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };

  export const getallAccountTypecount = async () => {
    try {
        const response = await instance.get('accounttype/accounttypecount');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}