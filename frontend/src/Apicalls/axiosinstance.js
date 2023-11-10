import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:4111/api/",
    // baseURL:"https://cargo-management.onrender.com"
    // baseURL:" http://backend.cyenosure.in",
  });

  export default instance