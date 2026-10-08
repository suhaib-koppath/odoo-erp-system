
const authMiddleware = require("../middleware/authMiddileware");

const express = require("express");

const todayInvoices = require("../middleware/todayInvoices");
const TodayOdooInvoiceSend = require("../controllers/TodayOdooInvoiceSend");
const getTestOdooInvoice = require("../controllers/testModel/getTestOdooInvoice");
const getTestOdooCreaditNotes = require("../controllers/testModel/getTestOdooCreaditNotes");
const router = express.Router();

router.use(authMiddleware)

//Today Invoice 
router.post("/today-customer-invoices",todayInvoices,TodayOdooInvoiceSend)

//Testing 
router.post("/test-odoo-invoice",getTestOdooInvoice)
// router.post("/test-odoo-creadit-note",getTestOdooCreaditNotes)

module.exports =  router;