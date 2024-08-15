import { ClerkProvider } from '@clerk/nextjs';
import { Inter, DM_Sans } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import clsx from 'clsx';

const inter = Inter({ subsets: ['latin'] });
const dmSans = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Organizo",
  description: "Template created by Frontend Tribe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider publishableKey= "pk_test_aG90LW1pbmstNjcuY2xlcmsuYWNjb3VudHMuZGV2JA">
      <html lang='en' className='relative'>
        <body
          className={clsx(
            inter.className,
            dmSans.className,
            'antialiased bg-[#EAEEFE]'
          )}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
