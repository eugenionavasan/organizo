'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const VerifyEmailPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login or another page after email verification
    console.log('Redirecting to login...');
    router.push('/login');
  }, [router]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '20px',
        backgroundColor: '#f0f0f0',
      }}
    >
      <p>Verifying your email address...</p>
    </div>
  );
};

export default VerifyEmailPage;
