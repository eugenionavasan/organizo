import { SignIn } from '@clerk/nextjs';
import React from 'react';

const LoginPage: React.FC = () => {
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
        signUpUrl='/sign-up'
        afterSignInUrl='/calendar'
      />
    </div>
  );
};

export default LoginPage;
