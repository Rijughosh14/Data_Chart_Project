import React, { useEffect, useState } from 'react';
import { GetNewCustomers } from '../../Services/UserService'; // Adjust the path as needed
import { Line } from 'react-chartjs-2';

const NewCustomersOverTime = () => {
  const [interval, setInterval] = useState('monthly'); // Default interval
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleIntervalChange = (event) => {
    setInterval(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await GetNewCustomers(interval);

        // Process and format the data for Chart.js
        const labels = data.map(entry => entry.period); // Use 'period' as the label
        const customersData = data.map(entry => entry.newCustomers); // Use 'newCustomers' as the data

        const formattedData = {
          labels,
          datasets: [
            {
              label: `New Customers (${interval})`,
              data: customersData,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              fill: false,
            }
          ]
        };
        setChartData(formattedData);
      } catch (err) {
        setError('Failed to fetch customer data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [interval]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
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
      {chartData ? (
        <div className="relative h-64">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default NewCustomersOverTime;
