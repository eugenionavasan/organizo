'use client';

import { UserButton } from '@clerk/nextjs';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export const Sidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={`min-h-screen w-64 bg-gray-800 text-white flex flex-col ${
        isCollapsed ? 'w-16' : 'w-64'
      } transition-width duration-300`}
    >
      <div className='p-4 flex justify-between items-center'>
        <h2 className={`text-xl font-bold ${isCollapsed ? 'hidden' : ''}`}>
          Organizo
        </h2>
        <button onClick={toggleCollapse} className='md:hidden'>
          <FontAwesomeIcon
            icon={isCollapsed ? faTimes : faBars}
            className='h-6 w-6 text-white'
          />
        </button>
      </div>
      <nav className={`flex-1 px-4 ${isCollapsed ? 'hidden' : ''}`}>
        <ul className='space-y-2'>
          <li>
            <Link href='/dashboard'>
              <a
                className={`block py-2.5 px-4 rounded ${
                  pathname === '/dashboard' ? 'bg-gray-700' : ''
                }`}
              >
                Dashboard
              </a>
            </Link>
          </li>
          <li>
            <Link href='/customers'>
              <a
                className={`block py-2.5 px-4 rounded ${
                  pathname === '/customers' ? 'bg-gray-700' : ''
                }`}
              >
                Customers
              </a>
            </Link>
          </li>
          <li>
            <Link href='/booking'>
              <a
                className={`block py-2.5 px-4 rounded ${
                  pathname === '/booking' ? 'bg-gray-700' : ''
                }`}
              >
                Booking
              </a>
            </Link>
          </li>
          <li>
            <Link href='/calendar'>
              <a
                className={`block py-2.5 px-4 rounded ${
                  pathname === '/calendar' ? 'bg-gray-700' : ''
                }`}
              >
                Calendar
              </a>
            </Link>
          </li>
        </ul>
      </nav>
      <div className='p-4 flex items-center space-x-4'>
        <div className='flex items-center'>
          <UserButton />
          {!isCollapsed && (
            <span className='ml-2 text-white font-medium'>Profile</span>
          )}
        </div>
      </div>
    </aside>
  );
};
