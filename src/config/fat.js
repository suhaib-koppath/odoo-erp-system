const axios = require("axios");
require("dotenv/config");

const fat = axios.create({
  baseURL: process.env.FAT_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

module.exports = fat;
