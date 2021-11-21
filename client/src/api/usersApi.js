import api from './api';

const BASE_URL = '/api/user';

const findSelf = async () => {
  try {
    const response = await api.get(`${BASE_URL}/self`, {
      headers: {
        'Cache-Control': 'no-cache', // Axios does a cache of requests by default and I don't want this to cause a false authentication state when changing pages
      },
    });

    return response.data;
  } catch (axiosRequestError) {
    throw axiosRequestError.response.data;
  }
};

const userApi = { findSelf };

export default userApi;
