// ACCOUNT RECEVABLE REPOSITORY

const odoo = require("../services/odoo");

const MODEL = "/json/2/account.move";
async function getAllOdooCreaditNote(page = 2, limit = 1) {
  const offset = (page - 1) * limit; // Calculate pagination offset
  const { data } = await odoo.post(`${MODEL}/search_read`, {
    "domain": [
    ["move_type", "=", "out_refund"], ["company_id", "=", 1]
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

module.exports = {
  getAllOdooCreaditNote,
};
