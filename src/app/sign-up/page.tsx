'use client';

import { SignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
  const router = useRouter();

  return (
    <div className='flex flex-col justify-center items-center h-screen p-5 bg-gray-100'>
      <SignUp
        path='/sign-up'
        routing='path'
        signInUrl='/login'
        forceRedirectUrl='/dashboard' // Changed from forceRedirectUrl
      />
    </div>
  );
};

export default SignUpPage;
