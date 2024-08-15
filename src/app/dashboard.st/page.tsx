import UpcomingAppointments from '@/app/ui.st/dashboard.st/UpcomingAppointments';
import RevenueGraph from '@/app/ui.st/dashboard.st/RevenueGraph';

export default function DashboardHome() {
    return (
    <div className="flex h-full">
        <div className="flex-grow flex flex-col">
            <div className="p-4 border-b">
                 <h1 className="text-2xl font-bold">Home</h1>
            </div>     
            
            <div className="p-6 md:p-12 flex-grow overflow-auto">
              <p>Welcome to your dashboard.</p>
              <RevenueGraph />
            </div>
        </div>  

        <div className="w-full md:w-1/3 flex flex-col">
        <div className="bg-gray-200 p-4 border-b" />
         <div className="flex-grow overflow-y-auto bg-white shadow-lg">
        <UpcomingAppointments />
        </div>
      </div>
    </div>
          
      );
    }