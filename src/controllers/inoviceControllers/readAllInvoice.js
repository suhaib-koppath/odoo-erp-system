// ACCOUNT RECEVABLE CONTROLLERS

const fat = require("../../config/fat");
const { getAllOdooInvoice } = require("../../repositories/invoice.repo");
const { getIvoiceProductDetails } = require("../../repositories/product.repo");
const mapInvoiceToTca = require("../../utils/mapInvoiceToTca ");
const readAllInvoice = async (req, res) => {
  try {
    const { data: invoices } = await getAllOdooInvoice();
    if (!invoices) throw new Error("Invoices Is Not Founded");

    const ERRORS = [];
    const RESPONSES = [];
    for (const invoice of invoices) {
      try {
        const formatedInvoice = await mapInvoiceToTca(invoice);
        console.log(formatedInvoice);

        // const responseInvoice = await fat.post(
        //   "/invoices/",
        //   {
        //     name: "Invoice INV-001",
        //     invoice_number: "INV-001",
        //     issue_date: "2026-05-01",
        //     invoice_type_code: "380",
        //     detail: {
        //       transaction_type_code: "00000000",
        //       invoice_currency_code: "AED",
        //       buyer_reference: "REF-001",
        //       process_control: {
        //         profile_id: "urn:peppol:bis:billing",
        //         customization_id: "urn:peppol:pint:billing-1@ae-1",
        //       },
        //       seller: { "...": "..." },
        //       buyer: { "...": "..." },
        //       totals: { "...": "..." },
        //       vat_breakdowns: [{ "...": "..." }],
        //       lines: [{ "...": "..." }],
        //     },
        //   },
        //   {
        //     headers: {
        //       Authorization: `Bearer ${req.user}`,
        //       "Content-Type": "application/json",
        //     },
        //   },
        // );
        // RESPONSES.push(responseInvoice);
      } catch (error) {
        ERRORS.push({
          error_message: error.response?.data?.message || error.message || "",
          name: invoice.name,
        });
        continue;
      }
    }
    // const { data: product } = await getIvoiceProductDetails(
    //   invoices[1]?.invoice_line_ids,
    // );
    return res.status(200).json({
      success: true,
      message: "Invoices fetched successfully",
      response: RESPONSES,
      errors: ERRORS,
    });
  } catch (error) {
    console.error("Get Invoices error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch Invoices",
      error: error.response || "",
    });
  }
};

module.exports = readAllInvoice;
