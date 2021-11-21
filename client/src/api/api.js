import axios from 'axios';
import { AppModes } from '../enums';

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === AppModes.DEVELOPMENT
      ? process.env.REACT_APP_DEVELOPMENT_BASE_URL
      : process.env.REACT_APP_PRODUCTION_BASE_URL,
  withCredentials: true,
});

export default api;
