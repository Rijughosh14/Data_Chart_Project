import React, { useEffect, useState } from 'react';
import { GetRepeatCustomers } from '../../Services/UserService'; // Adjust the path as needed
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register the required components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const RepeatCustomers = ({ interval }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await GetRepeatCustomers(interval);

        if (data.length === 0) {
          // Handle empty data with a placeholder message
          setChartData({
            labels: ['No Data'],
            datasets: [
              {
                label: 'Repeat Customers',
                data: [0], // Placeholder data
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
              },
            ],
          });
        } else {
          // Process and format the data for Chart.js
          const labels = data.map(entry => entry.period); // Assuming your API returns period
          const repeatCustomersData = data.map(entry => entry.repeatCustomers); // Assuming it returns repeatCustomers count

          setChartData({
            labels,
            datasets: [
              {
                label: `Repeat Customers (${interval})`,
                data: repeatCustomersData,
                backgroundColor: 'rgba(255, 159, 64, 0.5)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (err) {
        setError('Failed to fetch repeat customer data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [interval]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const options = {
    plugins: {
      tooltip: {
        enabled: chartData && chartData.labels[0] !== 'No Data', // Disable tooltips if displaying the placeholder
      },
    },
  };

  return (
    <div>
      {chartData && chartData.labels[0] === 'No Data' ? (
        <div>No repeat customers for this interval.</div>
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
};

export default RepeatCustomers;
