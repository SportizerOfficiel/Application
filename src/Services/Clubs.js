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

// Function to get clubs
export async function getClubs() {
  try {
    const response = await axios.get(`${BASE_URL}/clubs`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Function to get club by id
export async function getClubById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/clubs?id=${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Function to get the last match players by club and category
export async function getLastMatchPlayersByClubAndCateg(clubAndCateg) {
  try {
    const response = await axios.get(`${BASE_URL}/clubs?getLastMatchPlayersByClubAndCateg=${clubAndCateg}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Function to search club by name
export async function searchClubByName(name) {
  try {
    const response = await axios.get(`${BASE_URL}/clubs?search=${name}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Function to post club
export async function postClub(body) {
  try {
    const response = await axios.post(`${BASE_URL}/Clubs`, body);
    return response.data;
  } catch (error) {
    console.log(error)
    handleError(error);
  }
}

// Function to update club by id
export async function updateClubById(id, body) {
  try {
    const response = await axios.put(`${BASE_URL}/clubs?id=${id}`, body);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Function to delete club by id
export async function deleteClubById(id) {
  try {
    const response = await axios.delete(`${BASE_URL}/clubs?id=${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
