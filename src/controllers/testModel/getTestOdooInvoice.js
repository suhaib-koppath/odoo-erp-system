const { getOdooInvoiceById } = require("../../repositories/account.move");
const mapInvoiceToTca = require("../../utils/mapInvoiceToTca ");

const getTestOdooInvoice = async (req, res) => {
  try {
    const { invoiceid } = req.query;

    if (!invoiceid) {
      return res.status(400).json({ error: "Invoice ID is required!" });
    }
    const invoice = await getOdooInvoiceById(invoiceid);
    if (!invoice.name) throw new Error("The invoice is still in draft");
    const formatedInvoice = await mapInvoiceToTca(invoice);
    return res.status(200).json({
      success: true,
      message: "success",
      map_invoice:formatedInvoice,
      invoice,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch Invoices",
      error: error.response?.data || error.message || "",
    });
  }
};

module.exports = getTestOdooInvoice;
