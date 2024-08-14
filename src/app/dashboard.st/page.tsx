import UpcomingAppointments from '@/app/ui.st/dashboard.st/UpcomingAppointments';

export default function DashboardHome() {
    return (
    <div className="flex h-full">
        <div className="flex-grow p-6 md:p-12">
            <h1 className="text-5xl font-bold mb-6">Home</h1>
            
            <div className="mb-8">
              <p>Welcome to your dashboard.</p>
            </div>
        </div>        
            <div className="w-full md:w-1/3 p-6 overflow-y-auto h-full bg-white shadow-lg">
        <UpcomingAppointments />
            </div>
          </div>
          
      );
    }