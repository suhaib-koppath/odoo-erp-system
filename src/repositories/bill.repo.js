// ACCOUNT PAYBEL REPOSITORY

const odoo = require("../config/odoo");
const MODEL = "/json/2/account.move";
async function getAllBill({ page = 1, limit = 10 } = {}) {
  const offset = (page - 1) * limit;

  const { data } = await odoo.post(`${MODEL}/search_read`, {
    domain: [
      ["move_type", "=", "in_invoice"], // Get only vendor bills
  ["state", "=", "cancel"],
    ],
    // fields: ["id", "display_name", "write_date"],
    limit,
    offset,
    order: "id desc",
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
  getAllBill,
};
