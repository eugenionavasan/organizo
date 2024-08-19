import React from 'react';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import VerifyEmailPage from '../verify-email-address/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('VerifyEmailPage', () => {
  it('renders the verification message', () => {
    const routerMock = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(routerMock);

    render(<VerifyEmailPage />);

    // Ensure that the verification message is displayed
    expect(
      screen.getByText('Verifying your email address...')
    ).toBeInTheDocument();
  });

  it('redirects to /login on mount', () => {
    const routerMock = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(routerMock);

    render(<VerifyEmailPage />);

    // Ensure that the router's push method was called with '/login'
    expect(routerMock.push).toHaveBeenCalledWith('/login');
  });
});
