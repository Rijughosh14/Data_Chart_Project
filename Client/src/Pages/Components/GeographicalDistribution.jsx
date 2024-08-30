import React, { useEffect, useState } from 'react';
import { GetCustomerDistribution } from '../../Services/UserService'; // Adjust the path as needed
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components for Pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

// Function to generate random colors
const generateRandomColors = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    colors.push(`hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`);
  }
  return colors;
};

const GeographicalDistribution = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await GetCustomerDistribution();

        // Process and format the data for Chart.js
        const labels = data.map((entry) => entry.city); // Extract city names for labels
        const distributionData = data.map((entry) => entry.customerCount); // Extract customer count for data

        // Generate a unique color for each city
        const backgroundColors = generateRandomColors(labels.length);

        const formattedData = {
          labels,
          datasets: [
            {
              label: 'Customer Distribution by City',
              data: distributionData,
              backgroundColor: backgroundColors,
              borderColor: backgroundColors.map((color) =>
                color.replace(', 50%', ', 40%')
              ), // Slightly darker border colors
              borderWidth: 1,
            },
          ],
        };
        setChartData(formattedData);
      } catch (err) {
        setError('Failed to fetch customer distribution data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      {chartData ? (
        <div className="relative h-64">
          <Pie
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

export default GeographicalDistribution;
