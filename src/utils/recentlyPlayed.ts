interface PlayedTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  timestamp: string;
}

const RECENTLY_PLAYED_KEY = 'recently_played_tracks';
const MAX_TRACKS = 20;

export const addToRecentlyPlayed = (track: any) => {
  const existing = localStorage.getItem(RECENTLY_PLAYED_KEY);
  const recentTracks: PlayedTrack[] = existing ? JSON.parse(existing) : [];
  
  // Remove duplicate if exists
  const filtered = recentTracks.filter(t => t.id !== track.id);
  
  // Add new track at the beginning
  const newTrack: PlayedTrack = {
    ...track,
    timestamp: new Date().toISOString()
  };
  
  // Keep only the latest MAX_TRACKS
  const updated = [newTrack, ...filtered].slice(0, MAX_TRACKS);
  
  localStorage.setItem(RECENTLY_PLAYED_KEY, JSON.stringify(updated));
};

export const getRecentlyPlayed = (): PlayedTrack[] => {
  const stored = localStorage.getItem(RECENTLY_PLAYED_KEY);
  return stored ? JSON.parse(stored) : [];
};