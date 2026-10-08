// ACCOUNT RECEVABLE REPOSITORY

const odoo = require("../services/odoo");

const MODEL = "/json/2/sale.order.line";
async function getSalesOrderLineDetails(saleOrderLineId) {
  const { data } = await odoo.post(`${MODEL}/read`, {
    ids: saleOrderLineId,
    fields: ["id", "display_name", "order_id"],
  });
  // Odoo read method returns an array of records
  return Array.isArray(data) ? { data: data[0] } : { data };
}

module.exports = {
  getSalesOrderLineDetails,
};
