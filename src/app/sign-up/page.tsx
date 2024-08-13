'use client';

import { SignUp } from '@clerk/nextjs';

const SignUpPage: React.FC = () => {
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
      <SignUp path='/sign-up' routing='path' signInUrl='/login' />
    </div>
  );
};

export default SignUpPage;
