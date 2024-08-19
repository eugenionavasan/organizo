import { Sidebar } from './sidebar';
import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='flex'>
      <Sidebar />
      <main className='flex-1 p-8 bg-gray-100 min-h-screen'>{children}</main>
    </div>
  );
};

export default Layout;
