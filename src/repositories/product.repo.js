// ACCOUNT RECEVABLE REPOSITORY

const odoo = require("../services/odoo");

const MODEL = "/json/2/account.move.line";
async function getIvoiceProductDetails(line_id) {
  const { data } = await odoo.post(`${MODEL}/read`, {
    
  "ids": line_id,
    // "fields": [
    //     "id","partner_id","name","invoice_date","date",
    //     "move_type","currency_id","amount_untaxed",
    //     "amount_tax","amount_total"
    // ],
    fields: [
      "id",
      "move_id",
      "product_id",
      "name",
      "quantity",
      "product_uom_id",
      "price_unit",
      "discount",
      "tax_ids",
      "price_subtotal",
      "price_total",
    ],
  });

    // Odoo read method returns an array of records
    return Array.isArray(data) ? {data:data[0]} : {data};
}

module.exports = {
  getIvoiceProductDetails,
};
