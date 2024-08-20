'use client';
import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '../../components/sidebar';
import RevenueGraph from '@/components/revenueGraph';
import AppointmentGraph from '@/components/apppointmentGraph';
import UpcomingAppointments from '@/components/upcomingAppointments';
import ServiceCard from '@/components/serviceCard';
import ServiceDetailsModal from '@/components/serviceDetails';


const DashboardPage: React.FC = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | 'yearly' | null>(null);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/login');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  const handleServiceCardClick = (period: 'weekly' | 'monthly' | 'yearly') => {
    setSelectedPeriod(period);
  };

  const handleCloseModal = () => {
    setSelectedPeriod(null);
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div className="flex-grow flex flex-col">
            <div className="p-4 border-b">
                 <h1 className="text-2xl font-bold">Home</h1>
            </div>     
      <div className='flex-1 p-8'>
        <h1 className='pb-11 pr-5'>Welcome to your Dashboard</h1>
        <h1 className='text-xl font-bold pl-5'>Revenue Staistics:</h1>
         <RevenueGraph />  
         <h1  className='text-xl font-bold pl-5'>Booking Statistics:</h1>
        <AppointmentGraph />
        <div className="mt-8">
            <h1 className='text-xl font-bold pl-5'>Your Most Popular Service:</h1>
            <ServiceCard onClick={handleServiceCardClick} />
        </div>
      </div>
    </div>
    <div className="w-full md:w-1/3 flex flex-col">
        <div className="bg-gray-200 p-4 border-b" />
         <div className="flex-grow overflow-y-auto bg-white shadow-lg">
         <UpcomingAppointments /> 
        </div>
      </div>
      {selectedPeriod && (
        <ServiceDetailsModal
          period={selectedPeriod}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default DashboardPage;
