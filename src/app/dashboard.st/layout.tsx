import SideNav from '@/app/ui.st/dashboard.st/sidenav';
 
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex h-screen"> 
        <div className="fixed top-0 left-0 h-full w-64">
          <SideNav />
        </div> 
        <div className="ml-64 flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </div>
    );
  }