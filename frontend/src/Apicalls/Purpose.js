import instance from './axiosinstance'


export const AddPurpose = async (payload) => {
    try {
        const response = await instance.post('purpose/addpurpose', payload);
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const getallPurposee = async () => {
    try {
        const response = await instance.get('purpose/getallpurpose');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}
export const editPurpose= async (payload) => {
    try {
      // Make a PUT request to edit the employeetype
      const response = await instance.put(`purpose/editpurpose/${payload._id}`, payload);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };

  export const deletePurpose = async (payload) => {
    try {
      // Make a PUT request to edit the employeetype
      const response = await instance.delete(`purpose/deletepurpose/${payload}`);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };

  export const getallPurposeecount = async () => {
    try {
        const response = await instance.get('purpose/getallpurposecount');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}