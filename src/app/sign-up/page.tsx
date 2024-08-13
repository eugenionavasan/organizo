'use client';

import { SignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SignUpPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  // Redirect to dashboard if user is already signed in
  useEffect(() => {
    // Replace with your own method to check if user is authenticated
    const checkUser = async () => {
      try {
        const response = await fetch('/api/auth/check'); // Adjust based on your auth API
        if (response.ok) {
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Error checking user status:', error);
      }
    };

    checkUser();
  }, [router]);

  // Handle errors that may occur in the SignUp component
  const handleSignUpError = (error: any) => {
    setErrorMessage('Sign-up failed. Please check your details and try again.');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '20px',
        backgroundColor: '#f0f0f0',
      }}
    >
      {errorMessage && (
        <div style={{ color: 'red', marginBottom: '20px' }}>{errorMessage}</div>
      )}
      <SignUp
        path='/sign-up'
        routing='path'
        signInUrl='/login'
        afterSignUpUrl='/verify-email-address'
      />
    </div>
  );
};

export default SignUpPage;
