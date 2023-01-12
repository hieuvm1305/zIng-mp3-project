import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_LOCAL_API,
  timeout: 10000,
  headers: {},
});

client.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);
export default client;