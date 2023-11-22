import instance from './axiosinstance'


export const AddDepartment = async (payload) => {
    try {
        const response = await instance.post('Department/addDepartment', payload);
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const getallDepartment = async () => {
    try {
        const response = await instance.get('Department/getallDepartment');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}
export const editDepartment = async (payload) => {
    try {
      // Make a PUT request to edit the employeetype
      const response = await instance.put(`Department/editDepartment/${payload._id}`, payload);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };

  export const deleteDepartment = async (payload) => {
    try {
      // Make a PUT request to edit the employeetype
      const response = await instance.delete(`Department/deleteDepartment/${payload}`);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };

  export const getallDepartmentcount = async () => {
    try {
        const response = await instance.get('Department/getallDepartmentcount');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}