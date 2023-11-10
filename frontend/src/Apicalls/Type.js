import instance from './axiosinstance'


export const AddType = async (payload) => {
    try {
        const response = await instance.post('Type/addtype', payload);
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const getallType = async () => {
    try {
        const response = await instance.get('Type/getalltype');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}
export const editType= async (payload) => {
    try {
      // Make a PUT request to edit the employeetype
      const response = await instance.put(`Type/edittype/${payload._id}`, payload);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };

  export const deleteType = async (payload) => {
    try {
      // Make a PUT request to edit the employeetype
      const response = await instance.delete(`Type/deletetype/${payload}`);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };