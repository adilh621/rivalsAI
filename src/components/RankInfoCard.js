// src/components/RankInfoCard.js
'use client';
import React from 'react';
import Image from 'next/image';

export default function RankInfoCard({ rankInfo }) {
  const {
    currentRank,
    currentRankIcon,
    seasonPeak,
    seasonPeakIcon,
    lifetimePeak,
    lifetimePeakIcon,
  } = rankInfo;

  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg w-full max-w-md mx-auto mt-6 border-2">
      <h2 className="text-2xl font-bold mb-4">🎖️ Rank Info</h2>

      <div className="mb-4">
        <p className="font-semibold mb-2">Current Rank:</p>
        {currentRank ? (
          <div className="flex items-center space-x-4 mb-4">
            <Image src={currentRankIcon} alt={currentRank} width={64} height={64} />
            <span className="text-lg">{currentRank}</span>
          </div>
        ) : (
          <p className="text-gray-400 italic mb-4">No current rank data available.</p>
        )}

        <p className="font-semibold mb-2">Peak This Season:</p>
        {seasonPeak ? (
          <div className="flex items-center space-x-4 mb-4">
            <Image src={seasonPeakIcon} alt={seasonPeak} width={64} height={64} />
            <span className="text-lg">{seasonPeak}</span>
          </div>
        ) : (
          <p className="text-gray-400 italic mb-4">No peak rank this season.</p>
        )}

        <p className="font-semibold mb-2">All-Time Peak:</p>
        {lifetimePeak ? (
          <div className="flex items-center space-x-4">
            <Image src={lifetimePeakIcon} alt={lifetimePeak} width={64} height={64} />
            <span className="text-lg">{lifetimePeak}</span>
          </div>
        ) : (
          <p className="text-gray-400 italic">No lifetime peak data available.</p>
        )}
      </div>
    </div>
  );
}
