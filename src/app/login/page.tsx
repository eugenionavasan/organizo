'use client';
import { SignIn, useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard');
    }
  }, [isSignedIn, router]);

  return (
    <div className='flex justify-center items-center h-screen p-5 bg-gray-100'>
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
