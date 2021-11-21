import api from './api';

const BASE_URL = '/api/auth';

const signIn = async (signInData) => {
  try {
    const axiosResponse = await api.post(`${BASE_URL}/sign-in`, signInData);
    return axiosResponse.data;
  } catch (axiosRequestError) {
    throw axiosRequestError.response.data;
  }
};

const signUp = async (signUpData) => {
  try {
    const axiosResponse = await api.post(`${BASE_URL}/sign-up`, signUpData);
    return axiosResponse.data;
  } catch (axiosRequestError) {
    throw axiosRequestError.response.data;
  }
};

const signOut = async () => {
  try {
    const axiosResponse = await api.post(`${BASE_URL}/sign-out`, {});
    return axiosResponse.data;
  } catch (axiosRequestError) {
    throw axiosRequestError.response.data;
  }
};

const authApi = { signIn, signUp, signOut };

export default authApi;
