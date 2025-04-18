"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import InputGenre from "@/components/InputGenre";
import SearchButton from "@/components/SearchButton";
import { getRecentlyPlayed, getTopArtists, getRecommendedTracks } from '@/services/api';
import RandomWord from "@/components/RandomWord";
import Image from 'next/image';

// Mock data arrays
const mockRecentlyPlayed = [
  {
    id: "1",
    name: "Mock Track 1",
    artists: [{ name: "Mock Artist 1" }],
    album: { name: "Mock Album 1" }
  },
  {
    id: "2",
    name: "Mock Track 2",
    artists: [{ name: "Mock Artist 2" }],
    album: { name: "Mock Album 2" }
  },
  {
    id: "3",
    name: "Mock Track 3",
    artists: [{ name: "Mock Artist 3" }],
    album: { name: "Mock Album 3" }
  }
];

const mockTopArtists = [
  {
    id: "1",
    name: "Mock Artist 1",
    followers: { total: 1000000 }
  },
  {
    id: "2",
    name: "Mock Artist 2",
    followers: { total: 2000000 }
  },
  {
    id: "3",
    name: "Mock Artist 3",
    followers: { total: 3000000 }
  },
  {
    id: "4",
    name: "Mock Artist 3",
    followers: { total: 5000000 }
  }
];

const mockRecommended = [
  {
    id: "1",
    name: "Recommended Track 1",
    artists: [{ name: "Recommended Artist 1" }],
    album: { name: "Recommended Album 1" }
  },
  {
    id: "2",
    name: "Recommended Track 2",
    artists: [{ name: "Recommended Artist 2" }],
    album: { name: "Recommended Album 2" }
  },
  {
    id: "3",
    name: "Recommended Track 3",
    artists: [{ name: "Recommended Artist 3" }],
    album: { name: "Recommended Album 3" }
  }
];

const mockFeaturedPlaylists = [
  {
    id: "1",
    name: "Featured Playlist 1",
    tracks: { total: 20 }
  },
  {
    id: "2",
    name: "Featured Playlist 2",
    tracks: { total: 15 }
  },
  {
    id: "3",
    name: "Featured Playlist 3",
    tracks: { total: 25 }
  }
];

interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
  };
}

interface Artist {
  id: string;
  name: string;
  followers: { total: number };
}

interface Playlist {
  id: string;
  name: string;
  tracks: { total: number };
}

export default function MusicDashboard() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([]);
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [recommended, setRecommended] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get username and avatar from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedAvatar = localStorage.getItem('userAvatar');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (storedAvatar) {
      setAvatar(storedAvatar);
    }
  }, []); // Add empty dependency array

  const handleTrackPlay = async (track: Track) => {
    setCurrentTrack(track);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all data concurrently
        const [recentlyPlayedData, topArtistsData, recommendedData] = await Promise.all([
          getRecentlyPlayed(),
          getTopArtists(),
          getRecommendedTracks(5)
        ]);

        // Transform API data with safety checks
        const transformedRecentlyPlayed = recentlyPlayedData?.tracks 
          ? recentlyPlayedData.tracks.map((track: any) => ({
              id: track?.id || 'unknown',
              name: track?.name || 'Unknown Track',
              artists: track?.artists?.map((artist: any) => ({ 
                name: artist?.name || 'Unknown Artist' 
              })) || [{ name: 'Unknown Artist' }],
              album: { 
                name: track?.album?.name || 'Unknown Album' 
              }
            }))
          : [];

        const transformedTopArtists = topArtistsData?.artists 
          ? topArtistsData.artists.map((artist: any) => ({
              id: artist?.id || 'unknown',
              name: artist?.name || 'Unknown Artist',
              followers: { 
                total: artist?.followers?.total || 0 
              }
            }))
          : [];

        const transformedRecommended = recommendedData?.tracks 
          ? recommendedData.tracks.map((track: any) => ({
              id: track?.id || 'unknown',
              name: track?.name || 'Unknown Track',
              artists: track?.artists?.map((artist: any) => ({ 
                name: artist?.name || 'Unknown Artist' 
              })) || [{ name: 'Unknown Artist' }],
              album: { 
                name: track?.album?.name || 'Unknown Album' 
              }
            }))
          : [];

        setRecentlyPlayed(transformedRecentlyPlayed.length > 0 ? transformedRecentlyPlayed : mockRecentlyPlayed);
        setTopArtists(transformedTopArtists.length > 0 ? transformedTopArtists : mockTopArtists);
        setRecommended(transformedRecommended.length > 0 ? transformedRecommended : mockRecommended);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch music data');
        // Fallback to mock data
        setRecentlyPlayed(mockRecentlyPlayed);
        setTopArtists(mockTopArtists);
        setRecommended(mockRecommended);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Add empty dependency array

  // Add loading state display
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center">
        <div className="text-white text-center">
          <svg className="animate-spin h-10 w-10 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p>Loading your music...</p>
          <RandomWord/>
        </div>
      </div>
    );
  }

  // Add error state display
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-xl mb-4">😕 {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-white/10 hover:bg-white/20 rounded-lg px-4 py-2"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    localStorage.removeItem('username');
    router.push('/');
  };

  const handleSearch = (searchTerm: string) => {
    console.log("Search term:", searchTerm);
  };

  const handleTrackClick = (track: Track) => {
    setCurrentTrack(track);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Header - Responsive */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
          <div className="flex items-center justify-between">
            <p className="text-white text-lg">
              Hello {username ? username : 'Guest'}
            </p>
          </div>
          
          
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <form className="w-full md:w-auto flex gap-2">
              <InputGenre onSearch={handleSearch} />
              <SearchButton onSearch={handleSearch} />
            </form>
            
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors overflow-hidden"
              >
                {avatar ? (
                  <Image 
                    src={avatar}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white">👤</span>
                )}
              </button>

              {/* Profile Popup */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-xl animate-slideIn">
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                        {avatar ? (
                          <Image 
                            src={avatar}
                            alt="Profile"
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-2xl">👤</span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{username}</h3>
                        <p className="text-white/60 text-sm">Profile</p>
                        <button onClick={() => router.push("/profile/profilePage")}>
              Edit Profile
            </button>
                      </div>
                    </div>
                    
                    {/* ... rest of popup content ... */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Recently Played - Responsive Grid */}
        <section className="mb-6 md:mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Recently Played</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {recentlyPlayed.map((track) => (
              <div 
                key={track.id} 
                className="bg-white/10 rounded-lg p-3 md:p-4 hover:bg-white/20 transition-colors cursor-pointer"
                onClick={() => handleTrackPlay(track)}
              >
                <div className="aspect-square bg-white/5 rounded-md mb-3 flex items-center justify-center">
                  <svg className="w-8 md:w-12 h-8 md:h-12 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                </div>
                <h3 className="text-white font-medium text-sm md:text-base truncate">{track.name}</h3>
                <p className="text-white/60 text-xs md:text-sm truncate">{track.artists[0].name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Player Controls - Fixed Bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-lg border-t border-white/10 p-3 md:p-4">
          <div className="container mx-auto flex flex-col md:flex-row items-center gap-3 md:gap-6">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="w-12 h-12 bg-white/10 rounded flex-shrink-0 flex items-center justify-center">
                <svg className="w-6 h-6 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="text-white font-medium text-sm truncate">
                  {currentTrack ? currentTrack.name : "Select a track"}
                </h3>
                <p className="text-white/60 text-xs truncate">
                  {currentTrack ? currentTrack.artists[0].name : "No artist"}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 w-full md:w-auto">
              <div className="flex items-center gap-4 md:gap-6">
                <button className="text-white/60 hover:text-white">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                  </svg>
                </button>
                <button className="text-white bg-white/10 rounded-full p-2 md:p-3 hover:bg-white/20">
                  <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
                <button className="text-white/60 hover:text-white">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                  </svg>
                </button>
              </div>
              <div className="w-full md:w-96 bg-white/10 rounded-full h-1">
                <div className="bg-white w-1/3 h-full rounded-full"></div>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <button className="text-white/60 hover:text-white">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                </svg>
              </button>
              <div className="w-20 md:w-24 bg-white/10 rounded-full h-1">
                <div className="bg-white w-1/2 h-full rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-24">
          {/* Featured Playlists */}
          <section className="bg-white/5 rounded-xl p-4 md:p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Featured Playlists</h2>
            <div className="space-y-3">
              {mockFeaturedPlaylists.map((playlist) => (
                <div key={playlist.id} className="flex items-center gap-3 hover:bg-white/10 p-2 rounded-lg cursor-pointer">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white font-medium text-sm md:text-base truncate">{playlist.name}</h3>
                    <p className="text-white/60 text-xs md:text-sm">{playlist.tracks.total} songs</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Top Artists */}
          <section className="bg-white/5 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Top Artists</h2>
            <div className="space-y-4">
              {topArtists.map((artist) => (
                <div key={artist.id} className="flex items-center gap-4 hover:bg-white/10 p-2 rounded-lg cursor-pointer">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{artist.name}</h3>
                    <p className="text-white/60 text-sm">
                      {(artist.followers.total / 1000000).toFixed(1)}M followers
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recommended */}
          <section className="bg-white/5 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Recommended</h2>
            <div className="space-y-4">
              {recommended.slice(0, 4).map((track) => (
                <div 
                  key={track.id} 
                  onClick={() => handleTrackClick(track)}
                  className="flex items-center gap-4 hover:bg-white/10 p-2 rounded-lg cursor-pointer"
                >
                  <div className="w-16 h-16 bg-white/10 rounded flex items-center justify-center">
                    <svg className="w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                    </svg>
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="text-white font-medium scrolling-text">{track.name}</h3>
                    <p className="text-white/60 text-sm">{track.artists[0].name}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}








