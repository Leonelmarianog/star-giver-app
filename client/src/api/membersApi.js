import api from './api';

const BASE_URL = '/api/member';

const findAll = async (limit = 10, offset = 0) => {
  try {
    const response = await api.get(`${BASE_URL}?limit=${limit}&offset${offset}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const findByQuery = async (searchValue, limit = 10, offset = 0) => {
  try {
    const response = await api.get(
      `${BASE_URL}/search?query=${searchValue}&limit=${limit}&offset${offset}`
    );
    return response.data;
  } catch (axiosRequestError) {
    throw axiosRequestError.response.data;
  }
};

const findById = async (id) => {
  try {
    const response = await api.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (axiosRequestError) {
    throw axiosRequestError.response.data;
  }
};

const update = async (id, formData) => {
  try {
    const response = await api.patch(`${BASE_URL}/${id}`, formData);
    return response.data;
  } catch (axiosRequestError) {
    throw axiosRequestError.response.data;
  }
};

const membersApi = { findAll, findByQuery, findById, update };

export default membersApi;
