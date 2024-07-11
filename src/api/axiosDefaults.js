import axios from "axios";

axios.defaults.baseURL = 'https://drf-api-re-de7340a4e18c.herokuapp.com';
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();