import instance from './axiosinstance'


export const AddOperationalType = async (payload) => {
    try {
        const response = await instance.post('operatonaltype/addoperatinaltype', payload);
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const getallOperationalType = async () => {
    try {
        const response = await instance.get('operatonaltype/getalloperatinaltype');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}
export const editOperationalType= async (payload) => {
    try {
      // Make a PUT request to edit the employeetype
      const response = await instance.put(`operatonaltype/editoperatinaltype/${payload._id}`, payload);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };

  export const deleteOperationalType = async (payload) => {
    try {
      // Make a PUT request to edit the employeetype
      const response = await instance.delete(`operatonaltype/deleteoperatinaltype/${payload}`);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };

  export const getallOperationalTypecount = async () => {
    try {
        const response = await instance.get('operatonaltype/getalloperatinaltypecount');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}