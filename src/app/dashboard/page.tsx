'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, DollarSign, Users, Check, Clock, Star } from 'lucide-react';
import Layout from '@/components/layout';
import ClipLoader from 'react-spinners/ClipLoader';

type TimePeriod = 'weekly' | 'monthly' | 'fourMonths' | 'yearly';

interface DataPoint {
  label: string;
  value: number;
}

interface UpcomingAppointment {
  id: string;
  name: string;
  date: string;
  time: string;
  service: string;
  hasPaid: boolean;
}

interface PopularService {
  name: string;
  count: number;
}

interface DashboardData {
  revenue: DataPoint[];
  appointments: DataPoint[];
  upcomingAppointments: UpcomingAppointment[];
  popularService: PopularService;
}

const fetchDashboardData = async (revenuePeriod: TimePeriod, appointmentsPeriod: TimePeriod): Promise<DashboardData> => {
  const response = await fetch(`/api/dashboard?revenuePeriod=${revenuePeriod}&appointmentsPeriod=${appointmentsPeriod}`);
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }
  return response.json();
};

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [revenuePeriod, setRevenuePeriod] = useState<TimePeriod>('fourMonths');
  const [appointmentsPeriod, setAppointmentsPeriod] = useState<TimePeriod>('fourMonths');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchDashboardData(revenuePeriod, appointmentsPeriod);
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadDashboardData();
  }, [revenuePeriod, appointmentsPeriod]);

  const formatXAxisTick = (tickItem: string, period: TimePeriod) => {
    switch (period) {
      case 'weekly':
        return tickItem.slice(0, 3);
      case 'monthly':
        return parseInt(tickItem, 10).toString();
      case 'fourMonths':
      case 'yearly':
        return tickItem;
      default:
        return tickItem;
    }
  };

  const TimePeriodToggle: React.FC<{ 
    period: TimePeriod; 
    setPeriod: React.Dispatch<React.SetStateAction<TimePeriod>>;
    label: string;
  }> = ({ period, setPeriod, label }) => (
    <div className="mb-4">
      <span className="mr-2">{label}:</span>
      {['weekly', 'monthly', 'fourMonths', 'yearly'].map((p) => (
        <button
          key={p}
          className={`px-2 py-1 mr-2 rounded ${period === p ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setPeriod(p as TimePeriod)}
        >
          {p === 'fourMonths' ? 'Trimester' : p.charAt(0).toUpperCase() + p.slice(1)}
        </button>
      ))}
    </div>
  );

  if (isLoading) return <Layout>    <div className="flex justify-center items-center h-screen">
  <ClipLoader color={"#123abc"} loading={isLoading} size={50} />
</div></Layout>;
  if (!dashboardData) return <Layout><div className="flex justify-center items-center h-screen">No data available</div></Layout>;

  return (
    <Layout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md flex-1">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <DollarSign className="mr-2" /> Revenue
              </h2>
              <TimePeriodToggle period={revenuePeriod} setPeriod={setRevenuePeriod} label="Time Period" />
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboardData.revenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="label" 
                      tickFormatter={(tick) => formatXAxisTick(tick, revenuePeriod)}
                      interval={revenuePeriod === 'yearly' ? 0 : 'preserveStartEnd'}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex-1">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Users className="mr-2" /> Appointments
              </h2>
              <TimePeriodToggle period={appointmentsPeriod} setPeriod={setAppointmentsPeriod} label="Time Period" />
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboardData.appointments}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="label" 
                      tickFormatter={(tick) => formatXAxisTick(tick, appointmentsPeriod)}
                      interval={appointmentsPeriod === 'yearly' ? 0 : 'preserveStartEnd'}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
            
            <div className="flex flex-col gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md flex-grow">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Calendar className="mr-2" /> Upcoming Appointments
                </h2>
                <ul className="space-y-4">
                  {dashboardData.upcomingAppointments.map((appointment) => (
                    <li key={appointment.id} className="border-b pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{appointment.name}</p>
                          <p className="text-sm text-gray-600">
                            {appointment.date} at {appointment.time}
                          </p>
                          <p className="text-sm text-gray-600">{appointment.service}</p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center ${
                          appointment.hasPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appointment.hasPaid ? (
                            <>
                              <Check size={12} className="mr-1" />
                              Paid
                            </>
                          ) : (
                            <>
                              <Clock size={12} className="mr-1" />
                              Pending
                            </>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Star className="mr-2" /> Most Popular Service
                </h2>
                <div className="text-center">
                  <p className="text-3xl font-bold text-indigo-600">{dashboardData.popularService.name}</p>
                  <p className="text-lg text-gray-600 mt-2">Booked {dashboardData.popularService.count} times</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  );
};

export default Dashboard;