import axios from 'axios';

const BASE_URL = '/api';  // replace with your actual API URL

// Function to handle errors
function handleError(error) {
  console.log(error)
  if (error.response) {
    throw new Error(`Request failed with status code ${error.response.status}`);
  } else if (error.request) {
    throw new Error('No response was received to the request');
  } else {
    throw new Error('Error occurred while setting up the request');
  }
}

// Function to get players
export async function getPlayers() {
  try {
    const response = await axios.get(`${BASE_URL}/Players`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Function to get player by id
export async function getPlayerById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/Players?id=${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Function to search players by name
export async function searchPlayersByName(name) {
  try {
    const response = await axios.get(`${BASE_URL}/Players?search=${name}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Function to post player
export async function postPlayer(body) {
  try {
    const response = await axios.post(`${BASE_URL}/Players`, body);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Function to update player by id
export async function updatePlayerById(id, body) {
  console.log(id,body,"CALLL");
  try {
    const response = await axios.put(`${BASE_URL}/Players?id=${id}`, body);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Function to delete player by id
export async function deletePlayerById(id) {
  try {
    const response = await axios.delete(`${BASE_URL}/Players?id=${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
