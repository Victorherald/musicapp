import axios from 'axios';

// Create an axios instance with default settings
const api = axios.create({
  baseURL: 'https://api.example.com', // Replace with your actual API URL
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Function to get user's recently played tracks
export const getRecentlyPlayed = async () => {
  try {
    const response = await api.get('/recently-played');
    return response.data;
  } catch (error) {
    console.error('Error fetching recently played:', error);
    return [];
  }
};

// Function to get top artists
export const getTopArtists = async () => {
  try {
    const response = await api.get('/top-artists');
    return response.data;
  } catch (error) {
    console.error('Error fetching top artists:', error);
    return [];
  }
};

// Function to get recommended tracks
export const getRecommendedTracks = async () => {
  try {
    const response = await api.get('/recommendations');
    return response.data;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return [];
  }
};