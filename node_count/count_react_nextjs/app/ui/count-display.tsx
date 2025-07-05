'use client';

import './count-display.css';

interface CountDisplayProps {
  count: number;
}

export default function CountDisplay({ count }: CountDisplayProps) {
  return (
    <div className="count-display">
      <div className="count-value">{count}</div>
      <div className="count-label">Current Count</div>
    </div>
  );
}