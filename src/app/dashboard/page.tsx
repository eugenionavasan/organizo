// app/dashboard/page.tsx

'use client';

import { useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '../../components/sidebar';

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
      <div className='flex-1 p-8'>
        <h1>Welcome to your Dashboard</h1>
        {/* Additional content goes here */}
      </div>
    </div>
  );
};

export default DashboardPage;
