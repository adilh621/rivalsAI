'use client';
import { useState } from 'react';
import SearchBar from '../components/Searchbar'; // <-- Correct path

export default function Home() {
  const [username, setUsername] = useState('');

  const handleSearch = (input) => {
    console.log('Searching for:', input);
    setUsername(input);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white px-4">
      <h1 className="text-5xl font-bold mb-10">RivalsAI</h1>
      <SearchBar onSearch={handleSearch} />
    </main>
  );
}
