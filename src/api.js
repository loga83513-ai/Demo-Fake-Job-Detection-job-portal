import axios from "axios";

const api = axios.create({
  baseURL: "https://my-job-api.onrender.com"
});

export default api;
