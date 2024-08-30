import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
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
import { GetTotalSales } from '../../Services/UserService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesOverTimeChart = () => {
  const [interval, setInterval] = useState('monthly');
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await GetTotalSales(interval);
        processChartData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [interval]);

  const processChartData = (data) => {
    const labels = data.map((item) => {
      if (interval === 'yearly') {
        return `${item._id.year}`;
      } else if (interval === 'quarterly') {
        return `${item._id.year}-Q${item._id.quarter}`;
      } else {
        return `${item._id.year}-${String(item._id.month).padStart(2, '0')}`;
      }
    });

    const salesData = data.map((item) => parseFloat(item.totalSales));

    setChartData({
      labels,
      datasets: [
        {
          label: `Total Sales (${interval})`,
          data: salesData,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    });
  };

  const handleIntervalChange = (e) => {
    setInterval(e.target.value);
  };

  return (
    <div className="flex flex-col h-full w-full p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Total Sales Over Time</h2>
      <div className="mb-4">
        <label htmlFor="interval" className="mr-2">Select Interval: </label>
        <select
          id="interval"
          value={interval}
          onChange={handleIntervalChange}
          className="border rounded px-2 py-1"
        >
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      {
        loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="flex-1 w-full overflow-x-auto">
            <Line data={chartData} options={{ responsive: true }} />
          </div>
        )
      }
    </div>
  );
};

export default SalesOverTimeChart;
