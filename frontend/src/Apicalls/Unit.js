import instance from './axiosinstance'


export const AddUnit = async (payload) => {
    try {
        const response = await instance.post('Unit/addUnit', payload);
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const getallUnite = async () => {
    try {
        const response = await instance.get('Unit/getallUnit');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}
export const editUnit = async (payload) => {
    try {
      // Make a PUT request to edit the employeetype
      const response = await instance.put(`Unit/editUnit/${payload._id}`, payload);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };

  export const deleteUnit = async (payload) => {
    try {
      // Make a PUT request to edit the employeetype
      const response = await instance.delete(`Unit/deleteUnit/${payload}`);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };