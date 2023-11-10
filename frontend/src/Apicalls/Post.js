import instance from './axiosinstance'


export const Addpost = async (payload) => {
    try {
        const response = await instance.post('post/addpost', payload);
        return response.data
    } catch (err) {
        return err.response.data;
    }
}

export const getallpost = async () => {
    try {
        const response = await instance.get('post/getallpost');
        return response.data
    } catch (err) {
        return err.response.data;
    }
}
// export const editType= async (payload) => {
//     try {
//       // Make a PUT request to edit the employeetype
//       const response = await instance.put(`Type/edittype/${payload._id}`, payload);
//       return response.data;
//     } catch (err) {
//       return err.response.data;
//     }
//   };

  export const deletepost = async (payload) => {
    try {
      // Make a PUT request to edit the employeetype
      const response = await instance.delete(`post/deletepost/${payload}`);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };