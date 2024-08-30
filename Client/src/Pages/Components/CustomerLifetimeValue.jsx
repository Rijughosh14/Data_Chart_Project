import React, { useEffect, useState } from 'react';
import { GetCustomerLifetimeValueCohorts } from '../../Services/UserService'; // Adjust the path as needed
import { Bar } from 'react-chartjs-2';

const CustomerLifetimeValue = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await GetCustomerLifetimeValueCohorts();

        // Process and format the data for Chart.js
        const labels = data.map((entry) => entry.cohortMonth); // Cohort month as labels
        const totalLifetimeValue = data.map((entry) => parseFloat(entry.totalLifetimeValue)); // Total lifetime value
        const averageLifetimeValue = data.map((entry) => parseFloat(entry.averageLifetimeValue)); // Average lifetime value
        const numberOfCustomers = data.map((entry) => entry.numberOfCustomers); // Number of customers

        const formattedData = {
          labels,
          datasets: [
            {
              label: 'Total Lifetime Value',
              data: totalLifetimeValue,
              backgroundColor: 'rgba(75, 192, 192, 0.7)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Average Lifetime Value',
              data: averageLifetimeValue,
              backgroundColor: 'rgba(153, 102, 255, 0.7)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            },
            {
              label: 'Number of Customers',
              data: numberOfCustomers,
              backgroundColor: 'rgba(255, 99, 132, 0.7)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        };

        setChartData(formattedData);
      } catch (err) {
        setError('Failed to fetch customer lifetime value data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col h-full w-full p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Customer Lifetime Value</h2>
      <div className="flex-1 w-full overflow-x-auto">
        {chartData ? <Bar data={chartData} options={{ responsive: true }} /> : <div>No data available</div>}
      </div>
    </div>
  );
};

export default CustomerLifetimeValue;
