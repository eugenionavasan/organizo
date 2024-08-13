import { Sidebar } from './sidebar';
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='flex'>
      <Sidebar />
      <main className='flex-1 p-8 bg-gray-100 min-h-screen'>{children}</main>
    </div>
  );
};

export default Layout;
