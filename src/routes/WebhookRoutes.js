// ACCOUNT RECEVABLE ROUTES

const express = require("express");
const { getOdooInvoiceById } = require("../repositories/invoice.repo");
const mapInvoiceToTca = require("../utils/mapInvoiceToTca ");
const fat = require("../config/fat");
const authMiddleware = require("../middleware/authMiddileware");

const router = express.Router();

router.use(authMiddleware);

router.post("/invoice-oncreate", async (req, res) => {
  console.log("Odoo webhook received");
  try {
    const { _id: invoiceId } = req.body;
    const invoice = await getOdooInvoiceById(invoiceId);
    const formatedInvoice = await mapInvoiceToTca(invoice);

    const { data: responseInvoice } = await fat.post(
      "/invoices",
      formatedInvoice,
      {
        headers: {
          Authorization: `Bearer ${req.user}`,
          "Content-Type": "application/json",
        },
      },
    );

    console.log({
      success: true,
      message: "Invoice received successfully",
      invoice_data: responseInvoice,
    });

    res.status(200).json({
      success: true,
      message: "Invoice received successfully",
      invoice_data: responseInvoice,
    });
  } catch (error) {
    // console.error("Get Invoices error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch Invoices",
      error: error.response.data || error.message || "",
    });
  }
});

module.exports = router;
