// ACCOUNT RECEVABLE REPOSITORY

const odoo = require("../config/odoo");

const MODEL = "/json/2/account.move";
async function getAllOdooInvoice(page = 2, limit = 1) {
  const offset = (page - 1) * limit; // Calculate pagination offset
  const { data } = await odoo.post(`${MODEL}/search_read`, {
    domain: [
      ["move_type", "=", "out_invoice"], // Get only vendor bills
      ["company_id", "=", 1],
    ],
    // "fields": [
    //     "id","partner_id","name","invoice_date","date",
    //     "move_type","currency_id","amount_untaxed","company_id",
    //     "amount_tax","amount_total","invoice_line_ids","line_ids"
    // ],
    limit, // Number of records per page
    offset, // Records to skip
    order: "id desc", // Latest invoices first,
  });

  return {
    data,
    currentPage: page,
    limit,
    hasNextPage: data.length === limit,
    nextPage: data.length === limit ? page + 1 : null,
  };
}
async function getOdooInvoiceById(invoiceId) {
  if (!invoiceId) {
    throw new Error("Invoice ID is required");
  }

  try {
    // Usually GET for retrieving records
    const { data: invoice } = await odoo.post(`${MODEL}/search_read`, {
      domain: [["id","=",Number(invoiceId)]],
    });
    
    // Odoo read method returns an array of records
    return Array.isArray(invoice) ? invoice[0] : invoice;
    // return invoice;
  } catch (error) {
    console.error(
      "Error fetching invoice:",
      error.response?.data || error.message,
    );
    throw error.message;
  }
}
module.exports = {
  getAllOdooInvoice,
  getOdooInvoiceById,
};
