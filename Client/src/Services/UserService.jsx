import axios from 'axios'

export const GetTotalSales = (interval) => {
    return new Promise(async (resolve, reject) => {
      try {
        const config = {
          method: 'get',
          url: `/api/sales/${interval}`,
        };
  
        const response = await axios(config);
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Invalid response structure'));
        }
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'An error occurred while fetching the sales data';
        reject(new Error(errorMessage));
      }
    });
  };

export const GetSalesGrowthRate = (interval) => {
    return new Promise(async (resolve, reject) => {
      try {
        const config = {
          method: 'get',
          url: `/api/sales-growth/${interval}`,
        };
  
        const response = await axios(config);
  
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Invalid response structure'));
        }
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'An error occurred while fetching the sales growth rate data';
        reject(new Error(errorMessage));
      }
    });
  };

  
  export const GetNewCustomers = (interval) => {
    return new Promise(async (resolve, reject) => {
      try {
        const config = {
          method: 'get',
          url: `/api/new-customers/${interval}`,
        };
  
        const response = await axios(config);  
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Invalid response structure'));
        }
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'An error occurred while fetching the new customers data';
        reject(new Error(errorMessage));
      }
    });
  };

  
  export const GetRepeatCustomers = (interval) => {
    return new Promise(async (resolve, reject) => {
      try {
        const config = {
          method: 'get',
          url: `/api/repeat-customers/${interval}`,
        };
  
        const response = await axios(config);
  
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Invalid response structure'));
        }
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'An error occurred while fetching the repeat customers data';
        reject(new Error(errorMessage));
      }
    });
  };

  
  export const GetCustomerDistribution = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const config = {
          method: 'get',
          url: `/api/customer-distribution`,
        };
  
        const response = await axios(config);  
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Invalid response structure'));
        }
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'An error occurred while fetching the customer distribution data';
        reject(new Error(errorMessage));
      }
    });
  };

  
  export const GetCustomerLifetimeValueCohorts = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const config = {
          method: 'get',
          url: `/api/customer-lifetime-value-cohorts`,
        };
  
        const response = await axios(config);  
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error('Invalid response structure'));
        }
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'An error occurred while fetching the customer lifetime value cohorts';
        reject(new Error(errorMessage));
      }
    });
  };
  