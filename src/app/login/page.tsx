'use client';
import { SignIn, useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard');
    }
  }, [isSignedIn, router]);

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
      <SignIn
        path='/login'
        routing='path'
        forceRedirectUrl='/dashboard'
        signUpUrl='/sign-up'
      />
    </div>
  );
};

export default LoginPage;
