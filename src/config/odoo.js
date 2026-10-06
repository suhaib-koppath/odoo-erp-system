const axios = require("axios");
require("dotenv/config");

const odoo = axios.create({
  baseURL: process.env.ODOO_URL,
  headers: {
    Authorization: `bearer ${process.env.ODOO_API_KEY}`,
    "Content-Type": "application/json",
    "X-Odoo-Database": process.env.ODOO_DATABASE,
  },
});

module.exports = odoo;
