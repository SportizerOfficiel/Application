import axios from 'axios';

const BASE_URL = '/api';  // replace with your actual API URL

// Function to handle errors
function handleError(error) {
  if (error.response) {
    throw new Error(`Request failed with status code ${error.response.status}`);
  } else if (error.request) {
    throw new Error('No response was received to the request');
  } else {
    throw new Error('Error occurred while setting up the request');
  }
}

// Function to get matches
export async function getMatches() {
  try {
    const response = await axios.get(`${BASE_URL}/Matchs`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Function to get match by id
export async function getMatchById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/Matchs?id=${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Function to post match
export async function postMatch(body) {
  try {
    const response = await axios.post(`${BASE_URL}/Matchs`, body);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Function to update match by id
export async function updateMatchById(id, body) {
  try {
    const response = await axios.put(`${BASE_URL}/Matchs?id=${id}`, body);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Function to delete match by id
export async function deleteMatchById(id) {
  try {
    const response = await axios.delete(`${BASE_URL}/Matchs?id=${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
