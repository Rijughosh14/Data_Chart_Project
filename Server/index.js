const express = require('express');
const cors=require('cors');
const dotenv=require('dotenv').config()
const Mongoose=require('mongoose');
const ShopifyOrder= require ('./Models/shopifyOrdersModel.js')
const ShopifyCustomer =require ('./Models/shopifyCustomersModel.js')
const ShopifyProduct=require ('./Models/shopifyProductsModel.js')


const app = express();

//cors config
app.use(cors({ origin:true, credentials: true }));
//express json
app.use(express.json())
//url encode
app.use(express.urlencoded({extended:false}));

//Databse connection
Mongoose.connect(process.env.DB_URL);



// Utility function to group sales data by intervals
const groupSalesByInterval = async (interval) => {
  let groupBy;
  let sortBy;

  // Determine the group and sort criteria based on the interval
  switch (interval) {
    case 'daily':
      groupBy = {
        year: { $year: "$created_at" },
        month: { $month: "$created_at" },
        day: { $dayOfMonth: "$created_at" },
      };
      sortBy = { "_id.year": 1, "_id.month": 1, "_id.day": 1 };
      break;

    case 'monthly':
      groupBy = {
        year: { $year: "$created_at" },
        month: { $month: "$created_at" },
      };
      sortBy = { "_id.year": 1, "_id.month": 1 };
      break;

    case 'quarterly':
      groupBy = {
        year: { $year: "$created_at" },
        quarter: { $ceil: { $divide: [{ $month: "$created_at" }, 3] } },
      };
      sortBy = { "_id.year": 1, "_id.quarter": 1 };
      break;

    case 'yearly':
      groupBy = { year: { $year: "$created_at" } };
      sortBy = { "_id.year": 1 };
      break;

    default:
      throw new Error('Invalid interval. Please choose from daily, monthly, quarterly, or yearly.');
  }

  try {
    const salesData = await ShopifyOrder.aggregate([
      {
        $addFields: {
          created_at: {
            $dateFromString: { dateString: "$created_at" }
          },
          total_price_amount: {
            $toDouble: "$total_price_set.shop_money.amount"
          }
        }
      },
      {
        $group: {
          _id: groupBy,
          totalSales: {
            $sum: "$total_price_amount"
          },
          count: { $sum: 1 }, // Count the number of orders in each group
        },
      },
      {
        $sort: sortBy,
      },
    ]);

    return salesData;
  } catch (error) {
    console.error('Error aggregating sales data:', error.message);
    throw error;
  }
};


// API endpoint for fetching total sales over a specified interval
app.get('/api/sales/:interval', async (req, res) => {
  const { interval } = req.params;

  try {
    const validIntervals = ['daily', 'monthly', 'quarterly', 'yearly'];

    if (!validIntervals.includes(interval)) {
      return res.status(400).json({ error: 'Invalid interval. Use daily, monthly, quarterly, or yearly.' });
    }

    const salesData = await groupSalesByInterval(interval);
    res.json(salesData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Sales Growth Rate Over Time API Endpoint
app.get('/api/sales-growth/:interval', async (req, res) => {
  const { interval } = req.params;

  try {
    // Fetch and group sales data by the specified interval
    const salesData = await groupSalesByInterval(interval);

    if (salesData.length < 2) {
      return res.status(400).json({ error: 'Not enough data to calculate growth rate.' });
    }

    // Calculate the growth rate between each period
    const growthRates = salesData.map((current, index) => {
      if (index === 0) return null; // No previous data for the first period

      const previous = salesData[index - 1];
      const growthRate = ((current.totalSales - previous.totalSales) / previous.totalSales) * 100;

      return {
        period: current.period,
        growthRate: growthRate.toFixed(2) + '%',
      };
    }).filter(rate => rate !== null); // Remove the first null value

    res.json(growthRates);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// New Customers Added Over Time API Endpoint
app.get('/api/new-customers/:interval', async (req, res) => {
  const { interval } = req.params;

  // Determine the date format based on the interval (daily, monthly, quarterly, yearly)
  let dateFormat;
  switch (interval) {
    case 'daily':
      dateFormat = { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } };
      break;
    case 'monthly':
      dateFormat = { $dateToString: { format: "%Y-%m", date: "$created_at" } };
      break;
    case 'quarterly':
      dateFormat = {
        $concat: [
          { $dateToString: { format: "%Y", date: "$created_at" } },
          "-Q",
          { $toString: { $ceil: { $divide: [{ $month: "$created_at" }, 3] } } }
        ]
      };
      break;
    case 'yearly':
      dateFormat = { $dateToString: { format: "%Y", date: "$created_at" } };
      break;
    default:
      return res.status(400).json({ error: 'Invalid interval specified. Use daily, monthly, quarterly, or yearly.' });
  }

  try {
    // Aggregate customers based on the specified interval
    const newCustomers = await ShopifyCustomer.aggregate([
      {
        // Convert the created_at field to a Date if it's a string
        $addFields: {
          created_at: {
            $cond: {
              if: { $eq: [{ $type: "$created_at" }, "string"] },
              then: { $dateFromString: { dateString: "$created_at" } },
              else: "$created_at"
            }
          }
        }
      },
      {
        $group: {
          _id: dateFormat,
          newCustomers: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } } // Sort by date ascending
    ]);

    res.json(newCustomers.map(entry => ({
      period: entry._id,
      newCustomers: entry.newCustomers
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Number of Repeat Customers API Endpoint
app.get('/api/repeat-customers/:interval', async (req, res) => {
  const { interval } = req.params;

  let dateFormat;
  switch (interval) {
    case 'daily':
      dateFormat = { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } };
      break;
    case 'monthly':
      dateFormat = { $dateToString: { format: "%Y-%m", date: "$created_at" } };
      break;
    case 'quarterly':
      dateFormat = {
        $concat: [
          { $dateToString: { format: "%Y", date: "$created_at" } },
          "-Q",
          { $toString: { $ceil: { $divide: [{ $month: "$created_at" }, 3] } } }
        ]
      };
      break;
    case 'yearly':
      dateFormat = { $dateToString: { format: "%Y", date: "$created_at" } };
      break;
    default:
      return res.status(400).json({ error: 'Invalid interval specified. Use daily, monthly, quarterly, or yearly.' });
  }

  try {
    const repeatCustomers = await ShopifyOrder.aggregate([
      {
        $match: {
          created_at: { $type: "date" } // Make sure created_at is a valid date
        }
      },
      {
        $group: {
          _id: {
            customer_id: "$customer.id",
            period: dateFormat
          },
          orderCount: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.customer_id",
          periods: {
            $push: {
              period: "$_id.period",
              orderCount: "$orderCount"
            }
          },
          totalOrders: { $sum: "$orderCount" }
        }
      },
      {
        $match: {
          totalOrders: { $gt: 1 } // Filter customers with more than one purchase
        }
      },
      { $sort: { totalOrders: -1 } }
    ]);

    res.json(repeatCustomers);
  } catch (error) {
    console.error('Aggregation error:', error.message);
    res.status(500).json({ error: error.message });
  }
});


// Geographical Distribution of Customers API Endpoint
app.get('/api/customer-distribution', async (req, res) => {
  try {
    // Aggregate the count of customers based on their city
    const distribution = await ShopifyCustomer.aggregate([
      {
        $group: {
          _id: "$default_address.city", // Group by city
          customerCount: { $sum: 1 } // Count the number of customers in each city
        }
      },
      {
        $sort: { customerCount: -1 } // Sort cities by the number of customers in descending order
      }
    ]);

    res.json(distribution.map(entry => ({
      city: entry._id,
      customerCount: entry.customerCount
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/customer-lifetime-value-cohorts', async (req, res) => {
  try {
    const cohortData = await ShopifyOrder.aggregate([
      // Stage 1: Convert created_at to date if it's a string
      {
        $addFields: {
          createdAtDate: {
            $cond: [
              { $eq: [{ $type: "$created_at" }, "string"] },
              { $dateFromString: { dateString: "$created_at" } },
              "$created_at"
            ]
          }
        }
      },
      // Stage 2: Add a field for the month of the first purchase for each customer
      {
        $addFields: {
          firstPurchaseMonth: {
            $dateToString: { format: "%Y-%m", date: "$createdAtDate" }
          }
        }
      },
      // Stage 3: Group by the first purchase month (cohort) and accumulate CLV
      {
        $group: {
          _id: "$firstPurchaseMonth",
          totalLifetimeValue: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } },
          numberOfCustomers: { $addToSet: "$customer.id" } // Unique customers in each cohort
        }
      },
      // Stage 4: Project and calculate the average CLV per customer for each cohort
      {
        $project: {
          _id: 1,
          totalLifetimeValue: 1,
          numberOfCustomers: { $size: "$numberOfCustomers" },
          averageLifetimeValue: {
            $divide: ["$totalLifetimeValue", { $size: "$numberOfCustomers" }]
          }
        }
      },
      // Stage 5: Sort cohorts by the month
      {
        $sort: { _id: 1 }
      }
    ]);

    res.json(cohortData.map(cohort => ({
      cohortMonth: cohort._id,
      totalLifetimeValue: cohort.totalLifetimeValue.toFixed(2),
      averageLifetimeValue: cohort.averageLifetimeValue.toFixed(2),
      numberOfCustomers: cohort.numberOfCustomers
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});







// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
