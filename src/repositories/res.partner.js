// ACCOUNT PAYBEL REPOSITORY

const odoo = require("../services/odoo");
const MODEL = "/json/2/res.partner";
async function getAllCustomer({ page = 1, limit = 1 } = {}) {
  const offset = (page - 1) * limit;

  const { data } = await odoo.post(`${MODEL}/search_read`, {
    // domain: [
    //   ["move_type", "=", "in_invoice"], // Get only vendor bills
    //   ["state", "=", "cancel"],
    // ],
    // fields: ["id", "display_name", "write_date"],
//     fields: [
//   "id",
//   "name",
//   "email",
//   "phone",
//   "x_studio_secondary_phone"
// ],
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

async function getCustomerById({customerId=null} = {}) {
  const { data } = await odoo.post(`${MODEL}/search_read`, {
    domain: [
      ["id","=",customerId]
    ],
    // fields: [
    //   "id", "display_name", "write_date","complete_name",
    //   "website","type_address_label","street", "street2",
    //   "zip","city","routing_identifier"
    // ],
  });

  return {
    data
  };
}

module.exports = {
  getAllCustomer,
  getCustomerById
};
