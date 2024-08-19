'use client';

import { SignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SignUpPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await fetch('/api/auth/check');
        if (response.ok) {
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Error checking user status:', error);
      }
    };

    checkUser();
  }, [router]);

  return (
    <div className='flex flex-col justify-center items-center h-screen p-5 bg-gray-100'>
      {errorMessage && <div className='text-red-600 mb-5'>{errorMessage}</div>}
      <SignUp
        path='/sign-up'
        routing='path'
        signInUrl='/login'
        forceRedirectUrl='/verify-email-address'
      />
    </div>
  );
};

export default SignUpPage;
