'use client'; // Ensure this is present to handle client-side logic

import { useAuth, UserButton } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const DashboardPage: React.FC = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/login'); // Redirect to login if not signed in
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      <UserButton />
    </div>
  );
};

export default DashboardPage;
