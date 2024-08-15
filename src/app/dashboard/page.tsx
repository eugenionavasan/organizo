'use client';

import { useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '../../components/sidebar';
import RevenueGraph from '@/components/revenueGraph';
import UpcomingAppointments from '@/components/upcomingAppointments';


const DashboardPage: React.FC = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/login');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

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
      </div>
    </div>
    <div className="w-full md:w-1/3 flex flex-col">
        <div className="bg-gray-200 p-4 border-b" />
         <div className="flex-grow overflow-y-auto bg-white shadow-lg">
         <UpcomingAppointments /> 
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
