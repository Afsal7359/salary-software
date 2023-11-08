import instance from './axiosinstance'


export const AddDesignation = async (payload) => {
    try {
        const response = await instance.post('Designation/addDesignation', payload);
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const getallDesignation = async () => {
    try {
        const response = await instance.get('Designation/getallDesignation');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}
export const editDesignation = async (payload) => {
    try {
      // Make a PUT request to edit the employeetype
      const response = await instance.put(`Designation/editDesignation/${payload._id}`, payload);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };

  export const deleteDesignation = async (payload) => {
    try {
      // Make a PUT request to edit the employeetype
      const response = await instance.delete(`Designation/deleteDesignation/${payload}`);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };