import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { GetSalesGrowthRate } from '../../Services/UserService'; // Make sure the function path is correct
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesGrowthRate = ({ interval = 'monthly' }) => {
  const [growthData, setGrowthData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedInterval, setSelectedInterval] = useState(interval);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await GetSalesGrowthRate(selectedInterval);
        
        // Map the response to extract the growth rates and format the labels accordingly
        const formattedLabels = data.map((item, index) => {
          if (selectedInterval === 'yearly') return `Year ${index + 1}`;
          if (selectedInterval === 'quarterly') return `Q${index + 1}`;
          return `Period ${index + 1}`; // For daily or monthly
        });

        const growthRates = data.map(item => parseFloat(item.growthRate.replace('%', '')));

        setLabels(formattedLabels);
        setGrowthData(growthRates);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedInterval]);

  const handleIntervalChange = (e) => {
    setSelectedInterval(e.target.value);
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Sales Growth Rate (%)',
        data: growthData,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Sales Growth Rate (${selectedInterval.charAt(0).toUpperCase() + selectedInterval.slice(1)})`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}%`, // Format y-axis labels as percentages
        },
      },
    },
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="interval" className="mr-2">Select Interval: </label>
        <select
          id="interval"
          value={selectedInterval}
          onChange={handleIntervalChange}
          className="border rounded px-2 py-1"
        >
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div className="relative h-64">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SalesGrowthRate;
