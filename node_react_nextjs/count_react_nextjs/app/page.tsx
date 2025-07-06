'use client';

import { useState, useEffect } from 'react';
import CountButton from './ui/count-button';
import CountDisplay from './ui/count-display';
import { getCount } from './lib/api';

export default function Home() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchInitialCount = async () => {
      try {
        const initialCount = await getCount();
        setCount(initialCount);
      } catch (error) {
        console.error('Failed to fetch initial count:', error);
      }
    };

    fetchInitialCount();
  }, []);

  const handleCountUpdate = (newCount: number) => {
    setCount(newCount);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-8">
        <CountDisplay count={count} />
        <CountButton onCountUpdate={handleCountUpdate} />
      </div>
    </div>
  );
}