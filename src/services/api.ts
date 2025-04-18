import axios from 'axios';

const api = axios.create({
  baseURL: 'https://spotify23.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': 'e1d62073bdmsheb009b5b8a6f2a2p1f906ejsnf82d7a056083', // Replace with your actual RapidAPI key
    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
    'Content-Type': 'application/json',
  }
});

// Function to get user's recently played tracks
export const getRecentlyPlayed = async () => {
  try {
    const response = await api.get('/tracks/', {
      params: {
        ids: '4WNcduiCmDNfmTEz7JvmLv,4y1LsJpmMti1PfRQV9AWWe,5nTtCOCds6I0PHMNtqelas'
      }
    });
    // Ensure we return an object with a tracks array
    return {
      tracks: response.data.tracks || []
    };
  } catch (error) {
    console.error('Error fetching recently played:', error);
    return { tracks: [] };
  }
};

// Function to get top artists
export const getTopArtists = async () => {
  try {
    const response = await api.get('/artist_overview/', {
      params: {
        id: '06HL4z0CvFAxyc27GXpf02'
      }
    });
    // Ensure we return an object with an artists array
    return {
      artists: response.data.artists || []
    };
  } catch (error) {
    console.error('Error fetching top artists:', error);
    return { artists: [] };
  }
};

// Function to search tracks
export const searchTracks = async (query: string) => {
  try {
    const response = await api.get('/search/', {
      params: {
        q: query,
        type: 'tracks',
        offset: '0',
        limit: '10',
        numberOfTopResults: '5'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching tracks:', error);
    throw error;
  }
};

// Function to get recommended tracks
export const getRecommendedTracks = async (limit: number = 5) => {
  try {
    const response = await api.get('/recommendations/', {
      params: {
        seed_tracks: '0c6xIDDpzE81m2q797ordA',
        limit: limit
      }
    });
    // Ensure we return an object with a tracks array
    return {
      tracks: response.data.tracks || []
    };
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return { tracks: [] };
  }
};

