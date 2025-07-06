'use client';

import { useState } from 'react';
import { incrementCount } from '../lib/api';
import './count-button.css';

interface CountButtonProps {
  onCountUpdate: (newCount: number) => void;
}

export default function CountButton({ onCountUpdate }: CountButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const newCount = await incrementCount();
      onCountUpdate(newCount);
    } catch (error) {
      console.error('Failed to increment count:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="count-button"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : 'Increment Count'}
    </button>
  );
}