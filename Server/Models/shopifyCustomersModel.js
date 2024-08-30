const mongoose = require('mongoose');
require('mongoose-long')(mongoose); // Add support for Long type

const {Types: {Long}} = mongoose; // Destructure Long from mongoose.Types

const addressSchema = new mongoose.Schema({
  id: {
    type: Long, // Use Long type
    required: true
  },
  customer_id: {
    type: Long, // Use Long type
    required: true
  },
  first_name: String,
  last_name: String,
  company: String,
  address1: String,
  address2: String,
  city: String,
  province: String,
  country: String,
  zip: String,
  phone: String,
  name: String,
  province_code: String,
  country_code: String,
  country_name: String,
  default: {
    type: Boolean,
    default: false
  }
});

const shopifyCustomerSchema = new mongoose.Schema({
  _id: {
    type: Long, // Use Long type
    required: true
  },
  addresses: [addressSchema],
  admin_graphql_api_id: String,
  created_at: Date,
  currency: String,
  default_address: addressSchema,
  email: {
    type: String,
    required: true
  },
  email_marketing_consent: {
    state: String,
    opt_in_level: String,
    consent_updated_at: Date
  },
  first_name: String,
  last_name: String,
  last_order_id: {
    type: Long // Use Long type
  },
  last_order_name: String,
  multipass_identifier: String,
  note: String,
  orders_count: {
    type: Number,
    default: 0
  },
  phone: String,
  sms_marketing_consent: {
    state: String,
    consent_updated_at: Date
  },
  state: {
    type: String,
    default: 'disabled'
  },
  tags: String,
  tax_exempt: {
    type: Boolean,
    default: false
  },
  tax_exemptions: [String],
  total_spent: {
    type: String,
    default: '0.00'
  },
  updated_at: Date,
  verified_email: {
    type: Boolean,
    default: false
  }
});

const ShopifyCustomer = mongoose.model('ShopifyCustomer', shopifyCustomerSchema, 'shopifyCustomers');

module.exports = ShopifyCustomer;
