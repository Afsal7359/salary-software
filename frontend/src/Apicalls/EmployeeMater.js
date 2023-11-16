import instance from './axiosinstance'


export const Addemployee = async (payload) => {
    try {
        const response = await instance.post('employee/addemployee', payload);
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const getallemployeemaster = async () => {
    try {
        const response = await instance.get('employee/getallemployee');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}
export const editemployeemaster = async (payload) => {
    try {
      // Make a PUT request to edit the employeetype
      const response = await instance.put(`employee/editemployee/${payload._id}`, payload);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };

  export const deleteemployeetype = async (payload) => {
    try {
      // Make a PUT request to edit the employeetype
      const response = await instance.delete(`employee/deleteemployee/${payload}`);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };