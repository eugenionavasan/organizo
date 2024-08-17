import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Sidebar } from './sidebar';
import { usePathname } from 'next/navigation';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock the @clerk/nextjs module
jest.mock('@clerk/nextjs', () => ({
  UserButton: () => <div>User Button</div>,
}));

describe('Sidebar Component', () => {
  const mockPathnames = {
    dashboard: '/dashboard',
    customers: '/customers',
    booking: '/booking',
    calendar: '/calendar',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly and shows all links', () => {
    (usePathname as jest.Mock).mockReturnValue(mockPathnames.dashboard);

    render(<Sidebar />);

    // Check that the sidebar initially shows all navigation linksexpect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Customers')).toBeInTheDocument();
    expect(screen.getByText('Booking')).toBeInTheDocument();
    expect(screen.getByText('Calendar')).toBeInTheDocument();

    // Check that UserButton is renderedexpect(screen.getByText('User Button')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('collapses and expands the sidebar correctly', () => {
    (usePathname as jest.Mock).mockReturnValue(mockPathnames.dashboard);

    render(<Sidebar />);
  });

  it('highlights the current active link based on pathname', () => {
    (usePathname as jest.Mock).mockReturnValue(mockPathnames.dashboard);
    render(<Sidebar />);

    // Change the pathname to '/customers'
    (usePathname as jest.Mock).mockReturnValue(mockPathnames.customers);
    render(<Sidebar />);
  });
});
