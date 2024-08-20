import { useState, useEffect } from 'react';
import { serviceData } from '../lib/mockData';

const timePeriods = ['weekly', 'monthly', 'yearly'] as const;

interface ServiceCardProps {
  onClick: (period: 'weekly' | 'monthly' | 'yearly') => void;
}

export default function ServiceCard({ onClick }: ServiceCardProps) {
  const [currentPeriodIndex, setCurrentPeriodIndex] = useState(0);
  const [mostPopularService, setMostPopularService] = useState<{ name: string; bookings: number } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPeriodIndex((prev) => (prev + 1) % timePeriods.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const currentPeriod = timePeriods[currentPeriodIndex];
//   const mostPopularService = serviceData[currentPeriod][0];

useEffect(() => {
    async function fetchMostPopularService() {
      try {
        const response = await fetch(`/api/services/most-booked?period=${currentPeriod}`);
        const data = await response.json();
        setMostPopularService(data[0]); // Assuming the first one is the most popular
      } catch (error) {
        console.error('Error fetching most popular service:', error);
      }
    }

    fetchMostPopularService();
  }, [currentPeriod]);


  const handleClick = () => {
    onClick(currentPeriod);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer p-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
    >
      <p className="text-lg font-semibold">Most Booked {currentPeriod.charAt(0).toUpperCase() + currentPeriod.slice(1)}:</p>
      <h2 className="text-2xl font-bold">{mostPopularService?.name || 'Loading...'}</h2>
    </div>
  );
}
