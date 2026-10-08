// ACCOUNT RECEVABLE REPOSITORY

const odoo = require("../services/odoo");

const MODEL = "/json/2/product.product";
async function getProductDetails(ProductId) {
  const { data } = await odoo.post(`${MODEL}/read`, {
    
  "ids": ProductId,
    // fields: ["barcode", "default_code", "l10n_in_hsn_code", "uom_id"],
     
  });

    // Odoo read method returns an array of records
    return Array.isArray(data) ? {data:data[0]} : {data};
}

module.exports = {
  getProductDetails,
};
