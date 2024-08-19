'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const VerifyEmailPage = () => {
  const router = useRouter();

  useEffect(() => {
    console.log('Redirecting to login...');
    router.push('/login');
  }, [router]);

  return (
    <div className='flex justify-center items-center h-screen p-5 bg-gray-100'>
      <p>Verifying your email address...</p>
    </div>
  );
};

export default VerifyEmailPage;
