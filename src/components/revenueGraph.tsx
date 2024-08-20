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
// import { revenueData } from '../lib/mockData';

const graphTypes = ['weekly', 'monthly', 'yearly', 'total'] as const;

export default function RevenueGraph() {
  const [currentGraphIndex, setCurrentGraphIndex] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentGraphType = graphTypes[currentGraphIndex];

//   const data = revenueData[currentGraphType];
useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(`/api/revenue?type=${currentGraphType}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching revenue data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [currentGraphType]);

  const handlePrev = () => {
    setCurrentGraphIndex((prev) => (prev === 0 ? graphTypes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentGraphIndex((prev) => (prev === graphTypes.length - 1 ? 0 : prev + 1));
  };
  const currencyFormatter = (value: number) => `$${value.toLocaleString()}`;

  return (
    <div className="relative flex items-center mt-6">
      

      <div className="pl-5 w-full md:w-3/4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={currencyFormatter} />
            <Tooltip formatter={(value: number) => currencyFormatter(value)} />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      
      <button
        onClick={handleNext}
        className="absolute right-0 p-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 hover:scale-110"
      >
        &gt;
      </button>
    </div>
  );
}
