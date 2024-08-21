'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, DollarSign, Users, Check, Clock, Star } from 'lucide-react';
import Layout from '@/components/layout';

interface RevenueData {
  month: string;
  amount: number;
}

interface AppointmentData {
  month: string;
  count: number;
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
  revenue: RevenueData[];
  appointments: AppointmentData[];
  upcomingAppointments: UpcomingAppointment[];
  popularService: PopularService;
}

const fetchDashboardData = async (): Promise<DashboardData> => {
  const response = await fetch('/api/dashboard');
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }
  return response.json();
};

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    loadDashboardData();
  }, []);

  if (!dashboardData) return <Layout><div>Loading...</div></Layout>;

  return (
    <Layout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <DollarSign className="mr-2" /> Revenue
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.revenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Users className="mr-2" /> Appointments
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.appointments}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
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
    </Layout>
  );
};

export default Dashboard;