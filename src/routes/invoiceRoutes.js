// ACCOUNT RECEVABLE ROUTES


const express = require("express");
const readAllInvoice = require("../controllers/inoviceControllers/readAllInvoice");
const authMiddleware = require("../middleware/authMiddileware");

const router = express.Router();

// GET ALL INVOICES 
router.get("/read-all",authMiddleware,readAllInvoice)


router.post("/invoice-create-webhook", (req, res) => {
  console.log("Odoo webhook received");

  console.log(req.body);

  res.status(200).json({
    success: true,
    message: "Invoice received successfully",
    invoice_data:req.body
  });
});

module.exports =  router;