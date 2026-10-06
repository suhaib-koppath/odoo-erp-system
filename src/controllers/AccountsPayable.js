// ACCOUNT RECEVABLE CONTROLLERS

const fat = require("../services/fat");
const { getAllOdooInvoice } = require("../repositories/invoice.repo");
const  mapInvoiceToTca  = require("../utils/mapInvoiceToTca ");

const AccountsPayble = async (req, res) => {
  try {
    const { data: invoices } = await getAllOdooInvoice();
    if (!invoices) throw new Error("Odoo Invoices Is Not Founded");

    const ERRORS = [];
    const RESPONSES = [];

    for (const invoice of invoices) {
      try {

        const formatedInvoice = await mapInvoiceToTca(invoice);
        console.log(formatedInvoice);

        const responseInvoice = await fat.post(
          "/invoices",
          formatedInvoice,
          {
            headers: {
              Authorization: `Bearer ${req.user}`,
              "Content-Type": "application/json",
            },
          },
        );
        RESPONSES.push(responseInvoice);
      } catch (error) {
        ERRORS.push({
          name: invoice.name,
          error_data: error.response?.data || error.message || "",
        });
        continue;
      }
    }
    return res.status(200).json({
      success: true,
      message: "success",
      responses: RESPONSES,
      errors: ERRORS,
    });
  } catch (error) {
    console.error("Get Invoices error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch Invoices",
      error: error.response.data || error.message || "",
    });
  }
};

module.exports = AccountsPayble;
