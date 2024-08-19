import React from 'react';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import SignUpPage from '../page';

jest.mock('@clerk/nextjs', () => ({
  SignUp: () => <div>Mocked SignUp Component</div>,
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SignUpPage', () => {
  it('renders the SignUp component', () => {
    render(<SignUpPage />);

    // Ensure that the SignUp component is rendered
    expect(screen.getByText('Mocked SignUp Component')).toBeInTheDocument();
  });

  it('calls the useRouter hook', () => {
    const routerMock = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(routerMock);

    render(<SignUpPage />);

    // Ensure that the useRouter hook was called
    expect(useRouter).toHaveBeenCalled();
  });
});
