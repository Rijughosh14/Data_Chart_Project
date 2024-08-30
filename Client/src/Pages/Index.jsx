import React, { useState } from 'react';
import SalesOverTime from './Components/SalesOverTime';
import SalesGrowthRate from './Components/SalesGrowthRate';
import NewCustomersOverTime from './Components/NewCustomers';
import RepeatCustomers from './Components/RepeatCustomers';
import GeographicalDistribution from './Components/GeographicalDistribution';
import CustomerLifetimeValue from './Components/CustomerLifetimeValue';

const Index = () => {
  const [activeChart, setActiveChart] = useState('sales');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar collapse

  const renderContent = () => {
    switch (activeChart) {
      case 'sales':
        return <SalesOverTime />;
      case 'growth':
        return <SalesGrowthRate interval="monthly" />;
      case 'distribution':
        return <GeographicalDistribution />;
      case 'new-customers':
        return <NewCustomersOverTime interval="monthly" />;
      case 'repeat-customers':
        return <RepeatCustomers interval="monthly" />;
      case 'customer-lifetime':
        return <CustomerLifetimeValue interval="monthly" />;
      default:
        return <SalesOverTime interval="monthly" />;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside className={`bg-gray-800 text-white w-full sm:w-64 flex-col ${isSidebarOpen ? 'block' : 'hidden'} sm:block`}>
        <a
          href="#"
          className="flex items-center justify-center h-16 sm:h-20 bg-purple-600 hover:bg-purple-500"
        >
          <svg fill="none" viewBox="0 0 64 64" className="h-8 sm:h-12 w-8 sm:w-12">
            <path
              d="M32 14.2c-8 0-12.9 4-14.9 11.9 3-4 6.4-5.6 10.4-4.5 2.3.6 4 2.3 5.7 4 2.9 3 6.3 6.4 13.7 6.4 7.9 0 12.9-4 14.8-11.9-3 4-6.4 5.5-10.3 4.4-2.3-.5-4-2.2-5.7-4-3-3-6.3-6.3-13.7-6.3zM17.1 32C9.2 32 4.2 36 2.3 43.9c3-4 6.4-5.5 10.3-4.4 2.3.5 4 2.2 5.7 4 3 3 6.3 6.3 13.7 6.3 8 0 12.9-4 14.9-11.9-3 4-6.4 5.6-10.4 4.5-2.3-.6-4-2.3-5.7-4-2.9-3-6.3-6.4-13.7-6.4z"
              fill="#fff"
            />
          </svg>
        </a>
        <nav className="flex flex-col space-y-2 p-4">
          <button
            className={`py-2 px-3 rounded-lg hover:bg-gray-700 ${activeChart === 'sales' && 'bg-gray-700'}`}
            onClick={() => setActiveChart('sales')}
          >
            Total Sales
          </button>
          <button
            className={`py-2 px-3 rounded-lg hover:bg-gray-700 ${activeChart === 'growth' && 'bg-gray-700'}`}
            onClick={() => setActiveChart('growth')}
          >
            Sales Growth
          </button>
          <button
            className={`py-2 px-3 rounded-lg hover:bg-gray-700 ${activeChart === 'distribution' && 'bg-gray-700'}`}
            onClick={() => setActiveChart('distribution')}
          >
            Customer Distribution
          </button>
          <button
            className={`py-2 px-3 rounded-lg hover:bg-gray-700 ${activeChart === 'new-customers' && 'bg-gray-700'}`}
            onClick={() => setActiveChart('new-customers')}
          >
            New Customers
          </button>
          <button
            className={`py-2 px-3 rounded-lg hover:bg-gray-700 ${activeChart === 'repeat-customers' && 'bg-gray-700'}`}
            onClick={() => setActiveChart('repeat-customers')}
          >
            Repeat Customers
          </button>
          <button
            className={`py-2 px-3 rounded-lg hover:bg-gray-700 ${activeChart === 'customer-lifetime' && 'bg-gray-700'}`}
            onClick={() => setActiveChart('customer-lifetime')}
          >
            Customer Lifetime Value
          </button>
        </nav>
      </aside>

      {/* Hamburger Button for Mobile */}
      <div className="sm:hidden p-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-800 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isSidebarOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="w-full p-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
