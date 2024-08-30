const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  product_id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  position: Number,
  values: [String]
});

const variantSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  product_id: {
    type: Number,
    required: true
  },
  title: String,
  price: Number,
  sku: String,
  position: Number,
  inventory_policy: String,
  compare_at_price: Number,
  fulfillment_service: String,
  inventory_management: String,
  option1: String,
  option2: String,
  option3: String,
  created_at: Date,
  updated_at: Date,
  taxable: Boolean,
  barcode: String,
  grams: Number,
  weight: Number,
  weight_unit: String,
  inventory_item_id: {
    type: Number
  },
  inventory_quantity: Number,
  old_inventory_quantity: Number,
  requires_shipping: Boolean,
  admin_graphql_api_id: String,
  image_id: Number
});

const shopifyProductSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  admin_graphql_api_id: String,
  body_html: String,
  created_at: Date,
  handle: String,
  id: {
    type: Number,
    required: true
  },
  image: String,
  images: [String],
  options: [optionSchema],
  product_type: String,
  published_at: Date,
  published_scope: String,
  status: String,
  tags: String,
  template_suffix: String,
  title: {
    type: String,
    required: true
  },
  updated_at: Date,
  variants: [variantSchema],
  vendor: String
});

const ShopifyProduct = mongoose.model('ShopifyProduct', shopifyProductSchema,'shopifyProducts');

module.exports = ShopifyProduct;
