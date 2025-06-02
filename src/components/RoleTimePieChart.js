'use client';
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#a29bfe', '#fd79a8'];

export default function RoleTimePieChart({ data }) {
  // 'data' is already an array of { name, timePlayed }
  const pieData = data
    .map(role => ({
      name: role.name || 'Unknown',
      value: role.timePlayed || 0
    }))
    .filter(item => item.value > 0);

  if (pieData.length === 0) {
    return (
      <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg w-full max-w-md mx-auto mt-6 text-center">
        No role time data available.
      </div>
    );
  }

  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg w-full max-w-md mx-auto mt-6 border-2">
      <h2 className="text-xl font-bold mb-4 text-center">Time Played by Role</h2>
      <PieChart width={360} height={360}>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={140}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${(value / 3600).toFixed(1)} hrs`} />
        <Legend />
      </PieChart>
    </div>
  );
}
