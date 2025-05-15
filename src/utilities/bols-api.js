import axios from 'axios';

//const API_URL = 'http://localhost:3000/api/bols';//Dev mode
const API_URL = 'https://back-end-pyu8.onrender.com/api/bols';//PROD mode

export const getAllBOLs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getBOLById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createBOL = async (bolData) => {
  const response = await axios.post(API_URL, bolData);
  return response.data;
};///.//https://github.com/JoanneOs/Osman_Joanne_BOLTrack2_Capstone.git

export const updateBOL = async (id, bolData) => {
  const response = await axios.put(`${API_URL}/${id}`, bolData);
  return response.data;
};

export const deleteBOL = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};