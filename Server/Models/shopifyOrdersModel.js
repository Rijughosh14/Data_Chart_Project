const mongoose = require('mongoose');
require('mongoose-long')(mongoose); // Adds support for Long types in Mongoose
const { Types } = mongoose;
const Long = Types.Long;

// MoneySet Schema
const moneySetSchema = new mongoose.Schema({
  shop_money: {
    amount: String,
    currency_code: String,
  },
  presentment_money: {
    amount: String,
    currency_code: String,
  },
});

// Line Item Schema
const lineItemSchema = new mongoose.Schema({
  id: {
    type: Long, // Changed to Long type
    required: true,
  },
  variant_id: {
    type: Long, // Changed to Long type
    required: true,
  },
  title: String,
  quantity: Number,
  sku: String,
  variant_title: String,
  vendor: String,
  fulfillment_service: String,
  product_id: {
    type: Long, // Changed to Long type
    required: true,
  },
  requires_shipping: Boolean,
  taxable: Boolean,
  gift_card: Boolean,
  name: String,
  variant_inventory_management: String,
  properties: [String],
  product_exists: Boolean,
  fulfillable_quantity: Number,
  grams: Number,
  price: Number,
  total_discount: String,
  fulfillment_status: String,
  price_set: moneySetSchema,
  total_discount_set: moneySetSchema,
  discount_allocations: [String],
  duties: [String],
  admin_graphql_api_id: String,
});

// Customer Schema
const customerSchema = new mongoose.Schema({
  id: {
    type: Long, // Changed to Long type
    required: true,
  },
  email: String,
  created_at: Date,
  updated_at: Date,
  first_name: String,
  last_name: String,
  orders_count: Number,
  state: String,
  total_spent: String,
  last_order_id: {
    type: Long, // Changed to Long type
  },
  note: String,
  verified_email: Boolean,
  multipass_identifier: String,
  tax_exempt: Boolean,
  phone: String,
  tags: String,
  last_order_name: String,
  currency: String,
  marketing_opt_in_level: String,
  tax_exemptions: [String],
  admin_graphql_api_id: String,
  default_address: {
    id: {
      type: Long, // Changed to Long type
    },
    customer_id: {
      type: Long, // Changed to Long type
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
    default: Boolean,
  },
});

// Shopify Order Schema
const shopifyOrderSchema = new mongoose.Schema({
  _id: {
    type: Long, // Changed to Long type
    required: true,
  },
  id: {
    type: Long, // Changed to Long type
    required: true,
  },
  email: String,
  closed_at: Date,
  created_at: Date,
  updated_at: Date,
  number: Number,
  note: String,
  token: String,
  gateway: String,
  test: Boolean,
  total_price: String,
  subtotal_price: String,
  total_weight: Number,
  total_tax: String,
  taxes_included: Boolean,
  currency: String,
  financial_status: String,
  confirmed: Boolean,
  total_discounts: String,
  buyer_accepts_marketing: Boolean,
  name: String,
  referring_site: String,
  landing_site: String,
  cancelled_at: Date,
  cancel_reason: String,
  reference: String,
  user_id: {
    type: Long, // Changed to Long type
  },
  location_id: {
    type: Long, // Changed to Long type
  },
  source_identifier: String,
  source_url: String,
  device_id: {
    type: Long, // Changed to Long type
  },
  phone: String,
  customer_locale: String,
  app_id: Number,
  browser_ip: String,
  landing_site_ref: String,
  order_number: {
    type: Long, // Changed to Long type
    required: true,
  },
  discount_applications: [String],
  discount_codes: [String],
  note_attributes: [String],
  payment_gateway_names: [String],
  processing_method: String,
  source_name: String,
  fulfillment_status: String,
  tax_lines: [String],
  tags: String,
  contact_email: String,
  order_status_url: String,
  presentment_currency: String,
  total_line_items_price_set: moneySetSchema,
  total_discounts_set: moneySetSchema,
  total_shipping_price_set: moneySetSchema,
  subtotal_price_set: moneySetSchema,
  total_price_set: moneySetSchema,
  total_tax_set: moneySetSchema,
  line_items: [lineItemSchema],
  shipping_lines: [String],
  billing_address: customerSchema,
  shipping_address: customerSchema,
  fulfillments: [String],
  client_details: String,
  refunds: [String],
  customer: customerSchema,
  total_line_items_price: String,
});

const ShopifyOrder = mongoose.model('ShopifyOrder', shopifyOrderSchema, 'shopifyOrders');

module.exports = ShopifyOrder;
