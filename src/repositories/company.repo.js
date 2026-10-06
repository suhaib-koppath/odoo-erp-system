// ACCOUNT PAYBEL REPOSITORY

const odoo = require("../config/odoo");
const MODEL = "/json/2/res.company";
async function getAllCompany({ page = 1, limit = 1 } = {}) {
  const offset = (page - 1) * limit;

  const { data } = await odoo.post(`${MODEL}/search_read`, {
    // domain: [
    // ],
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

async function getCompanyById({companyId=null} = {}) {
  const { data } = await odoo.post(`${MODEL}/search_read`, {
    domain: [
      ["id","=",companyId]
    ],
    // fields: [ "id", "display_name"],
  });

  return {
    data
  };
}
module.exports = {
  getAllCompany,
  getCompanyById
};
