"use client";

import { useState, useEffect } from 'react';

interface InputGenreProps {
  onSearch: (searchTerm: string) => void;
}

export default function InputGenre({ onSearch }: InputGenreProps) {
  const placeholders = ["pop", "house", "EDM", "country", "tribal", "metal", "funk", "dubstep"];
  
  const [placeholder, setPlaceholder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * placeholders.length);
    setPlaceholder(`Search ${placeholders[randomIndex]}`);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder={placeholder}
        className="bg-black w-80 text-white px-4 py-2 rounded focus:outline-none"
      />
      {searchTerm && (
        <button
          onClick={() => {
            setSearchTerm("");
            onSearch("");
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
        >
          ✕
        </button>
      )}
    </div>
  );
}
