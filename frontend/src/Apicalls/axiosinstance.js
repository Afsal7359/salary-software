import axios from 'axios'

const instance = axios.create({
    // baseURL: "http://localhost:4111/api/",
    // baseURL:"https://cargo-management.onrender.com"
    baseURL:"https://marketfed-qqeh.onrender.com/api/",
  });

  export default instance