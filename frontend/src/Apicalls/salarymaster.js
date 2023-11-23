import instance from './axiosinstance'


export const Addsalarymaster = async (payload) => {
    try {
        const response = await instance.post('salary/addsalarymaster', payload);
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const getallSalary = async () => {
    try {
        const response = await instance.get('salary/getallsalary');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const editsalarymaster= async (payload) => {
    try {
      // Make a PUT request to edit the employeetype
      const response = await instance.post(`salary/editsalarymaster/${payload._id}`, payload);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };

  export const deletesalarymaster = async (payload) => {
    try {
      // Make a PUT request to edit the employeetype
      const response = await instance.delete(`salary/deletesalarymaster/${payload}`);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };

  export const getallSalarycount = async () => {
    try {
        const response = await instance.get('salary/getallsalarycount');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}