// src/components/HeroCard.js
'use client';
import React from 'react';
import Image from 'next/image';

export default function HeroCard({ segment }) {
  if (!segment || !segment.metadata || !segment.stats) {
    return null; // Skip rendering if data is incomplete
  }

  const { metadata, stats } = segment;

  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg w-full max-w-md mx-auto mt-6">
      <div className="flex items-center mb-4">
        <Image
          src={metadata.imageUrl}
          alt={metadata.name}
          width={64}
          height={64}
          className="rounded-full"
        />
        <div className="ml-4">
          <h3 className="text-xl font-bold">{metadata.name}</h3>
          <p className="text-sm text-gray-400">Games Played: {stats.matchesPlayed?.displayValue || 'N/A'}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-400">Win %</p>
          <p className="font-semibold">{stats.matchesWinPct?.displayValue || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">KDA</p>
          <p className="font-semibold">{stats.kdaRatio?.displayValue || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Kills</p>
          <p className="font-semibold">{stats.kills?.displayValue || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Deaths</p>
          <p className="font-semibold">{stats.deaths?.displayValue || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}
