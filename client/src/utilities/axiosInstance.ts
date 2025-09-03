import { DEV_API_URL } from "../config";

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: DEV_API_URL,
});

export default axiosInstance;
