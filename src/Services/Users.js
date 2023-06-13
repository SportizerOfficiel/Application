// UserService.js

import axios from 'axios';

const BASE_URL = '/api';  // replace with your actual API URL

function handleError(error) {
  // Error handling logic
  if (error.response) {
    throw new Error(`Request failed with status code ${error.response.status}`);
  } else if (error.request) {
    throw new Error('No response was received to the request');
  } else {
    throw new Error('Error occurred while setting up the request');
  }
}

export async function getAllUsers() {
  try {
    const response = await axios.get(`${BASE_URL}/User`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function getUserById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/User?id=${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function createUser(body) {
  try {
    const response = await axios.post(`${BASE_URL}/User`, body);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function updateUserById(id, body) {
  try {
    const response = await axios.put(`${BASE_URL}/User?id=${id}`, body);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUserById(id) {
  try {
    const response = await axios.delete(`${BASE_URL}/User?id=${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// PubsId related functions
export async function getAllPubsId() {
  try {
    const response = await axios.get(`${BASE_URL}/User?pubs=true`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function getPubsId(id) {
  try {
    const response = await axios.get(`${BASE_URL}/User?id=${id}&pubs=true`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function addPubsId(id, body) {
  try {
    const response = await axios.post(`${BASE_URL}/User?id=${id}&pubs=true`, body);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function removePubsId(id, body) {
  try {
    const response = await axios.delete(`${BASE_URL}/User?id=${id}&pubs=true`, body);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function updatePubsIds(id, body) {
  try {
    const response = await axios.put(`${BASE_URL}/User?id=${id}&pubs=true`, body);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
