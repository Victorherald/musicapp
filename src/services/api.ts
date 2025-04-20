import axios from 'axios';
import { addToRecentlyPlayed } from '@/utils/recentlyPlayed';

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


export const getFeaturedPlaylists = async (limit: number = 3) => {
  try {
    const playlistIds = [
      '37i9dQZF1DXcBWIGoYBM5M',  // Today's Top Hits
      '37i9dQZF1DX0XUsuxWHRQd',  // RapCaviar
      '37i9dQZF1DX10zKzsJ2jva'   // Viva Latino
    ];

    const response = await api.get('/playlist_tracks', {
      params: {
        id: playlistIds[0],
        offset: 0,
        limit: 100
      }
    });

    // Transform to match dashboard's expected structure
    return {
      playlists: [{
        id: playlistIds[0],
        name: 'Featured Playlist',
        tracks: {
          total: Array.isArray(response.data) ? response.data.length : 0
        }
      }]
    };
  } 
  catch (error) {
    console.error('Error fetching playlists:', error);
    return { playlists: [] };  // Return empty array matching expected structure
  }
};

// Function to get top artists
// Function to get user's top artists
export const getTopArtists = async (limit: number = 5) => {
  try {
    // Get multiple artists instead of just one
    const response = await api.get('/artists/', {
      params: {
        // Use an array of artist IDs for variety
        ids: [
          '06HL4z0CvFAxyc27GXpf02', // Taylor Swift
          '1uNFoZAHBGtllmzznpCI3s', // Justin Bieber
          '3TVXtAsR1Inumwj472S9r4', // Drake
          '6eUKZXaKkcviH0Ku9w2n3V', // Ed Sheeran
          '0Y5tJX1MQlPlqiwlOH1tJY'  // Travis Scott
        ].join(','),
        limit: limit
      }
    });

    // Transform and validate the response
    const artists = response.data.artists || [];
    return {
      artists: artists.map((artist: any) => ({
        id: artist?.id || 'unknown',
        name: artist?.name || 'Unknown Artist',
        followers: { total: artist?.followers?.total || 0 },
        images: artist?.images || [],
        genres: artist?.genres || []
      }))
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








