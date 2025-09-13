import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

export function DemoChart({ chartData = [] }: { chartData?: any[] }) {
  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex h-80 w-128 items-center justify-center rounded-md border border-dashed border-gray-300">
        <p className="text-gray-500">No data to display</p>
      </div>
    );
  }

  return (
    <LineChart
      width={512}
      height={320}
      data={chartData}
      className="rounded-md border-2 border-blue-600 p-4"
    >
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
    </LineChart>
  );
}
