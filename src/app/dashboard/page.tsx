'use client';

import { useAuth, UserButton } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
    <div style={{ padding: '20px' }}>
      <h1>Welcome to your Dashboard</h1>
      <UserButton />
      <div style={{ marginTop: '20px' }}>
        <a href='/calendar' style={{ textDecoration: 'none', color: 'blue' }}>
          Go to Calendar
        </a>
      </div>
    </div>
  );
};

export default DashboardPage;
