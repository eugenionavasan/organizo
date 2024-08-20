import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
// import { appointmentData } from '../lib/mockData';

interface GraphData {
    name: string;
    appointments: number;
  }

// const graphTypes = ['daily', 'weekly', 'monthly'] as const;

export default function AppointmentGraph() {
  const [currentGraphIndex, setCurrentGraphIndex] = useState(0);
  const [data, setData] = useState<GraphData[]>([]);
  const graphTypes = ['daily', 'weekly', 'monthly'] as const;

  useEffect(() => {
    async function fetchData() {
      const currentGraphType = graphTypes[currentGraphIndex];
      try {
        const response = await fetch(`/api/appointments/overview?range=${currentGraphType}`);
        const result = await response.json();
        setData([result]);
      } catch (error) {
        console.error('Error fetching appointment data:', error);
      }
    }

    fetchData();
  }, [currentGraphIndex]);


  
//   const data = appointmentData[currentGraphType];

  const handlePrev = () => {
    setCurrentGraphIndex((prev) => (prev === 0 ? graphTypes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentGraphIndex((prev) => (prev === graphTypes.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative flex items-center justify-center mt-6">
      {/* Left Arrow
      <button
        onClick={handlePrev}
        className="absolute left-0 p-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
      >
        &lt;
      </button> */}

      
      <div className="w-full md:w-3/4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="appointments"
              stroke="#82ca9d"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      
      <button
        onClick={handleNext}
        className="absolute right-0 p-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
      >
        &gt;
      </button>
    </div>
  );
}
