'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [input, setInput] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      router.push(`/profile/${input.trim()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <input
        type="text"
        placeholder="Enter username..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full px-6 py-3 rounded-lg bg-white text-black text-lg placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-500"
      />
    </form>
  );
}
