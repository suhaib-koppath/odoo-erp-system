
const authMiddleware = require("../middleware/authMiddileware");

const express = require("express");

const todayInvoices = require("../middleware/todayInvoices");
const TodayOdooInvoiceSend = require("../controllers/TodayOdooInvoiceSend");
const router = express.Router();

router.use(authMiddleware)

//Today Invoice 
router.post("/today-customer-invoices",todayInvoices,TodayOdooInvoiceSend)

module.exports =  router;