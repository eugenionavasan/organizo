import { serviceData } from '../lib/mockData';
import { useEffect, useState } from 'react';

export default function ServiceDetailsModal({
  period,
  onClose,
}: {
  period: 'weekly' | 'monthly' | 'yearly';
  onClose: () => void;
}) {
    
    const [services, setServices] = useState<{ name: string; bookings: number }[]>([]);

    useEffect(() => {
      async function fetchServices() {
        try {
          const response = await fetch(`/api/services/most-booked?period=${period}`);
          const data = await response.json();
          setServices(data);
        } catch (error) {
          console.error('Error fetching services:', error);
        }
      }
  
      fetchServices();
    }, [period]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
        <h3 className="text-xl font-semibold mb-4">Service Bookings ({period.charAt(0).toUpperCase() + period.slice(1)})</h3>
        <ul>
          {services.map((service, index) => (
            <li key={index} className="mb-2">
              <span className="font-semibold">{service.name}</span>: {service.bookings} bookings
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
