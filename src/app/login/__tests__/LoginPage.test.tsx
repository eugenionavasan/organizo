import React from 'react';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import LoginPage from '../page';

jest.mock('@clerk/nextjs', () => ({
  SignIn: () => <div>Mocked SignIn Component</div>,
  useAuth: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LoginPage', () => {
  it('renders the SignIn component when not signed in', () => {
    (useAuth as jest.Mock).mockReturnValue({ isSignedIn: false });
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<LoginPage />);

    expect(screen.getByText('Mocked SignIn Component')).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });

  it('redirects to /dashboard when signed in', () => {
    (useAuth as jest.Mock).mockReturnValue({ isSignedIn: true });
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<LoginPage />);

    expect(push).toHaveBeenCalledWith('/dashboard');
  });
});
