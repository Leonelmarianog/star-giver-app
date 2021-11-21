import api from './api';

const BASE_URL = '/api/star';

const giveStar = async (memberTo) => {
  try {
    const response = await api.post(`${BASE_URL}/give/${memberTo}`, {});
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const removeStar = async (memberTo) => {
  try {
    const response = await api.post(`${BASE_URL}/remove/${memberTo}`, {});
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const starsApi = { giveStar, removeStar };

export default starsApi;
