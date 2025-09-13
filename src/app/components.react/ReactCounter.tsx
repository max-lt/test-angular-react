import React from 'react';
import { useState, useEffect } from 'react';

type ReactCounterProps = {
  startValue?: number;
  onCountChange?: (event: { detail: { value: number } }) => void;
};

export function ReactCounter({ startValue = 0, onCountChange }: ReactCounterProps) {
  const [count, setCount] = useState(startValue);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    // Call the event handler prop when the count changes
    if (onCountChange) {
      onCountChange({ detail: { value: newCount } });
    }
  };

  // Update internal state if the prop changes
  useEffect(() => setCount(startValue), [startValue]);

  return (
    <div className="rounded-md border-2 border-blue-600 p-4">
      <h4 className="mb-2 text-lg font-bold">React Counter Component</h4>
      <p className="mb-2">Current Count: {count}</p>
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 cursor-pointer"
        onClick={increment}
      >
        Click Me
      </button>
    </div>
  );
}
