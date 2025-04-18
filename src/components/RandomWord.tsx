"use client";

import { useState, useEffect } from 'react';



export default function RandomWord() {
  const word= ["It's gonna be a bumpy ride!", 
    "I'm something of a programmer myself!",
     "Have you eaten today?", 
     "Better than Spotify!", 
     "Cut me some slack!", 
      "Still under development", 
      "Grab your popcorns",
       "Get your grooves ready!"];
  
  const [randWord, setrandWord] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * word.length);
    setrandWord(word[randomIndex]);
  }, []);

  return (
        <p className='text-white/20'>{randWord}</p>
      );
  
}