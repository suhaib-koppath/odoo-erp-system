
const authMiddleware = require("../middleware/authMiddileware");

const express = require("express");
const AccountsPayble = require("../controllers/AccountsPayable");
const AccountsReceivable = require("../controllers/AccountsReceivable");
const RejectedOrFailedInvoices = require("../controllers/RejectedOrFailedInvoices");
const Resubmit = require("../controllers/Resubmit");
const CreaditNote = require("../controllers/CreaditNote");
const uploadAndSubmitInvoice = require("../controllers/uploadAndSubmitInvoice");
const todayInvoices = require("../middleware/todayInvoices");
const TodayOdooInvoiceSend = require("../controllers/TodayOdooInvoiceSend");
const router = express.Router();

router.use(authMiddleware)

router.post("/accounts-receivable",AccountsReceivable)
router.post("/accounts-payble",AccountsPayble)
router.post("/accounts-receivable-and-uploading",uploadAndSubmitInvoice)
router.post("/creaditnote",CreaditNote)

router.post("/rejected-and-failed-invoices",RejectedOrFailedInvoices)
router.put("/resubmit/:status",Resubmit)

//Today Invoice 
router.post("/today-customer-invoices",todayInvoices,TodayOdooInvoiceSend)
module.exports =  router;