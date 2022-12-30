import axios from "axios";

const client = axios.create({
  baseURL: 'https://api-zingmp3-vercel.vercel.app/api',
  timeout: 10000,
  headers: {},
});

client.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);
export default client;