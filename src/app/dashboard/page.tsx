"use client";

import { useState, useEffect } from "react";
import InputGenre from "@/components/InputGenre";
import SearchButton from "@/components/SearchButton";

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

// Mock data
const mockRecentlyPlayed: Track[] = [
  {
    id: "1",
    name: "Bohemian Rhapsody",
    artists: [{ name: "Queen" }],
    album: { name: "A Night at the Opera" }
  },
  {
    id: "2",
    name: "Stairway to Heaven",
    artists: [{ name: "Led Zeppelin" }],
    album: { name: "Led Zeppelin IV" }
  },
  {
    id: "3",
    name: "Sweet Child O' Mine",
    artists: [{ name: "Guns N' Roses" }],
    album: { name: "Appetite for Destruction" }
  },
  {
    id: "4",
    name: "Shattered dreams",
    artists: [{ name: "Yakazuba" }],
    album: { name: "superherald" }
  },
];

const mockTopArtists: Artist[] = [
  {
    id: "1",
    name: "The Beatles",
    followers: { total: 30000000 }
  },
  {
    id: "2",
    name: "Pink Floyd",
    followers: { total: 20000000 }
  },
  {
    id: "3",
    name: "David Bowie",
    followers: { total: 15000000 }
  }
];

const mockFeaturedPlaylists: Playlist[] = [
  {
    id: "1",
    name: "Rock Classics",
    tracks: { total: 100 }
  },
  {
    id: "2",
    name: "90s Hits",
    tracks: { total: 80 }
  },
  {
    id: "3",
    name: "Chill Vibes",
    tracks: { total: 50 }
  }
];

const mockRecommended: Track[] = [
  {
    id: "1",
    name: "November Rain",
    artists: [{ name: "Guns N' Roses" }],
    album: { name: "Use Your Illusion I" }
  },
  {
    id: "2",
    name: "Hotel California",
    artists: [{ name: "Eagles" }],
    album: { name: "Hotel California" }
  },
  {
    id: "3",
    name: "Imagine",
    artists: [{ name: "John Lennon" }],
    album: { name: "Imagine" }
  },
   {
    id: "4",
    name: "Ghostly Sails",
    artists: [{ name: "Viktor Yakazuba" }],
    album: { name: "Groovebash" }
  }
];

export default function MusicDashboard() {
  // Add username state
  const [username, setUsername] = useState<string>("");

  // This runs when the dashboard loads
  useEffect(() => {
    // Get the username we stored during login
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || 'Guest');
  }, []);

  const handleSearch = (searchTerm: string) => {
    console.log("Search term:", searchTerm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          {/* Add the greeting here */}
          <p className="text-white text-lg">Hello, {username}!</p>
          <h1 className="text-3xl font-bold text-white">Your Music</h1>
          <form className="flex">
            <InputGenre onSearch={handleSearch} />
            <SearchButton onSearch={handleSearch} />
          </form>
          <div className="flex items-center gap-4">
            <button className="bg-white/10 hover:bg-white/20 text-white rounded-full px-4 py-2">
              Upgrade to Premium
            </button>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white">👤</span>
            </div>
          </div> 
        </header>

        {/* Recently Played */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Recently Played</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mockRecentlyPlayed.map((track) => (
              <div key={track.id} className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors cursor-pointer">
                <div className="aspect-square bg-white/5 rounded-md mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                </div>
                <h3 className="text-white font-medium truncate">{track.name}</h3>
                <p className="text-white/60 text-sm truncate">{track.artists[0].name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Player */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/10 rounded"></div>
                <div>
                  <h3 className="text-white font-medium">Now Playing</h3>
                  <p className="text-white/60 text-sm">Artist</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-6">
                  <button className="text-white/60 hover:text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                    </svg>
                  </button>
                  <button className="text-white bg-white/10 rounded-full p-3 hover:bg-white/20">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                  <button className="text-white/60 hover:text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                    </svg>
                  </button>
                </div>
                <div className="w-96 bg-white/10 rounded-full h-1">
                  <div className="bg-white w-1/3 h-full rounded-full"></div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="text-white/60 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                </button>
                <div className="w-24 bg-white/10 rounded-full h-1">
                  <div className="bg-white w-1/2 h-full rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {/* Featured Playlists */}
          <section className="bg-white/5 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Featured Playlists</h2>
            <div className="space-y-4">
              {mockFeaturedPlaylists.map((playlist) => (
                <div key={playlist.id} className="flex items-center gap-4 hover:bg-white/10 p-2 rounded-lg cursor-pointer">
                  <div className="w-16 h-16 bg-white/10 rounded flex items-center justify-center">
                    <svg className="w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{playlist.name}</h3>
                    <p className="text-white/60 text-sm">{playlist.tracks.total} songs</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Top Artists */}
          <section className="bg-white/5 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Top Artists</h2>
            <div className="space-y-4">
              {mockTopArtists.map((artist) => (
                <div key={artist.id} className="flex items-center gap-4 hover:bg-white/10 p-2 rounded-lg cursor-pointer">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{artist.name}</h3>
                    <p className="text-white/60 text-sm">
                      {(artist.followers.total / 1000000).toFixed(1)}M monthly listeners
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
              {mockRecommended.map((track) => (
                <div key={track.id} className="flex items-center gap-4 hover:bg-white/10 p-2 rounded-lg cursor-pointer">
                  <div className="w-16 h-16 bg-white/10 rounded flex items-center justify-center">
                    <svg className="w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{track.name}</h3>
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







