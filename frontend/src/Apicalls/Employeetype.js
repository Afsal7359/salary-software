import instance from './axiosinstance'


export const Addemployeetype = async (payload) => {
    try {
        const response = await instance.post('employeetype/addemployeetype', payload);
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const getallemployeetype = async () => {
    try {
        const response = await instance.get('employeetype/getallemployeetype');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}
export const editemployeetype = async (payload) => {
    try {
      // Make a PUT request to edit the employeetype
      const response = await instance.put(`employeetype/editemployeetype/${payload._id}`, payload);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };

  export const deleteemployeetype = async (payload) => {
    try {
      // Make a PUT request to edit the employeetype
      const response = await instance.delete(`employeetype/deleteemployeetype/${payload}`);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };

  export const getallemployeetypecount = async () => {
    try {
        const response = await instance.get('employeetype/getallemployeecount');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}