const OrderModel = require("../models/orderModel");

const GetAnalytics = async (req, res) => {
  try {
    const orders = await OrderModel.find();

    // TOTAL REVENUE
    const totalRevenue = orders.reduce(
      (acc, item) => acc + item.amount,
      0
    );

    // TOTAL ORDERS
    const totalOrders = orders.length;

    // DELIVERED ORDERS
    const deliveredOrders = orders.filter(
      (o) => o.orderStatus === "Delivered"
    ).length;

    // UNIQUE CUSTOMERS
    const uniqueCustomers =
      [...new Set(orders.map((o) => o.userId))];

    const totalCustomers = uniqueCustomers.length;

    // STATUS COUNTS
    const delivered = orders.filter(
      (o) => o.orderStatus === "Delivered"
    ).length;

    const processing = orders.filter(
      (o) => o.orderStatus === "Processing"
    ).length;

    const shipped = orders.filter(
      (o) => o.orderStatus === "Shipped"
    ).length;

    const cancelled = orders.filter(
      (o) => o.orderStatus === "Cancelled"
    ).length;

    // RECENT ORDERS
    const recentOrders = orders
      .slice(-6)
      .reverse();

      const productMap = {};

orders.forEach((order) => {

  order.products.forEach((p) => {

    if (!productMap[p.title]) {

      productMap[p.title] = {
        name: p.title,
        sales: 0,
        revenue: 0,
        image: p.image,
      };
    }

    productMap[p.title].sales += p.qty;

    productMap[p.title].revenue +=
      p.price * p.qty;

  });

});

const cityMap = {};

orders.forEach((order) => {

  const city =
    order.shippingInfo?.city;

  if (!city) return;

  if (!cityMap[city]) {

    cityMap[city] = {
      city,
      customers: 0,
    };

  }

  cityMap[city].customers += 1;

});

const topCities =
  Object.values(cityMap)
    .sort(
      (a, b) =>
        b.customers - a.customers
    )
    .slice(0, 5);

const topProducts =
  Object.values(productMap)
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

    // NEW CUSTOMERS
const newCustomers =
  uniqueCustomers.length;

// REPEAT CUSTOMERS
const customerOrders = {};

orders.forEach((o) => {

  if (!customerOrders[o.userId]) {

    customerOrders[o.userId] = 0;

  }

  customerOrders[o.userId]++;

});

const repeatCustomers =
  Object.values(customerOrders)
    .filter((v) => v > 1)
    .length;

// AVG ORDER VALUE
const avgOrderValue =
  totalOrders > 0

    ? totalRevenue / totalOrders

    : 0;

// CONVERSION RATE
const conversionRate =
  totalCustomers > 0

    ? (
        (totalOrders /
          totalCustomers) *
        100
      ).toFixed(1)

    : 0;

    res.json({
      totalRevenue,
      totalOrders,
      deliveredOrders,
      totalCustomers,
      topProducts,
      topCities,
      newCustomers,
repeatCustomers,
avgOrderValue,
conversionRate,
      statusData: [
        {
          name: "Delivered",
          value: delivered,
        },
        {
          name: "Processing",
          value: processing,
        },
        {
          name: "Shipped",
          value: shipped,
        },
        {
          name: "Cancelled",
          value: cancelled,
        },
      ],

      recentOrders,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  GetAnalytics,
};