// src/components/BasicInfoCard.js
'use client';
import React from 'react';

export default function BasicInfoCard({ data }) {
  const segments = data?.segments || [];

  // Extract competitive and non-competitive playtime
  const overviewSegment = segments.find(seg => seg.type === 'overview');
  const compPlaytime = overviewSegment?.stats?.timePlayed?.displayValue || 'N/A';

  // Time played in all other modes (excluding overview)
  const otherModes = segments.filter(seg => seg.type !== 'overview' && seg.type !== 'ranked-peaks');
  const totalOtherTimeSeconds = otherModes.reduce((acc, seg) => {
    const seconds = seg?.stats?.timePlayed?.value || 0;
    return acc + seconds;
  }, 0);
  const otherPlaytime = secondsToHrs(totalOtherTimeSeconds);

  // Level info
  const level = data?.metadata?.level || 'N/A';

  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg w-full max-w-md mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4">Basic Info</h2>
      <p><strong>Level:</strong> {level}</p>
      <p><strong>Competitive Play Time:</strong> {compPlaytime}</p>
      <p><strong>Other Modes Play Time:</strong> {otherPlaytime}</p>
    </div>
  );
}

// Helper to convert seconds to readable format
function secondsToHrs(seconds) {
  if (!seconds) return 'N/A';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return `${hrs}h ${mins}m`;
}
