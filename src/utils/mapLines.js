const { getInvoiceProductDetails } = require("../repositories/account.move.line");
const { getProductDetails } = require("../repositories/product.product");
const { getSalesOrderLineDetails } = require("../repositories/sales.order.line");

async function mapLines(invoice) {
  const items = [];
  // console.log(invoice.invoice_line_ids);
  for (const line_id of invoice.invoice_line_ids) {
    const { data:invoice_product } = await getInvoiceProductDetails(line_id);
    const {data:product} = await getProductDetails(invoice_product.product_id[0])
    const  sales_order_lines = [];
    for (const sales_order_line of invoice_product.sale_line_ids) {
      const {data:order_line} = await getSalesOrderLineDetails(sales_order_line)
      sales_order_lines.push(order_line)
    }

    // console.log("product");
    // console.log(product );
    // console.log("product end");

    items.push({
      item_name:product.name,
      // Unique identifier for the invoice line
      line_id: invoice_product.id,
      // Free-text note relevant to the invoice line
      note: "",
      // Identifier for an object this invoice line is based on
      //  (e.g., PO line number or serial number).
      object_identifier: invoice_product.ref ? invoice_product.ref : "",
      // Scheme code for the object identifier (e.g., 'sales order').
      object_identifier_scheme: "sales order",
      // Quantity of items charged in this invoice line.
      invoiced_quantity: invoice_product.quantity,
      // UN/ECE standard unit of measure code (e.g., 'H87' for pieces, 'KGM' for kilograms).
      invoiced_quantity_unit_of_measure_code: invoice_product.product_uom_id[1],
      // Total amount of the invoice line before tax
      line_net_amount:  (invoice_product.quantity * invoice_product.price_unit) * (1 - invoice_product.discount / 100),
      // Line identifier within a referenced invoice order
      purchase_order_line_reference: sales_order_lines?.[0].display_name || "",
      // `${invoice_product.ref}-${invoice_product.id}`,
      // Buyer accounting cost centre reference for this line
      buyer_accounting_reference: "",
      // Identifier for a referenced invoice order
      purchase_order_reference: sales_order_lines?.[0].order_id?.[1] || "",
      // Identifier for a referenced despatch advice 
      despatch_advice_reference: "",
      // Production batch or lot identifier 
      batch_number: "",
      // x_studio_batch_number  ,
      // Start date of the line invoicing period 
      line_period_start_date: invoice_product.deferred_start_date || invoice.invoice_date || "",
      // End date of the line invoicing period 
      line_period_end_date: invoice_product.deferred_end_date || invoice.invoice_date_due || "",
      // Net price of a single item (after discount, before tax).
      item_net_price: (invoice_product.price_unit*(100-invoice_product.discount)/100),
      // Discount subtracted from gross price to get net price 
      item_price_discount: invoice_product.price_subtotal,
      // Unit price exclusive of TAX before discount
      // Gross price of a single item (before discount and tax).
      item_gross_price: product.base_unit_price,
      // Base quantity to which the item price applies (usually 1).
      item_price_base_quantity: product.base_unit_count || 1,
      // Unit of measure code for the base quantity 
      item_price_base_quantity_unit_of_measure_code: product.base_unit_name,
      item_description: "",
      // Seller-assigned item identifier 
      item_sellers_identifier: invoice_product.company_id[1],
      // Buyer-assigned item identifier
      item_buyers_identifier: invoice_product.partner_id[1],
      // Item identifier based on a registered scheme 
      // Item standard identifier (e.g., Barcode/GTIN)
      item_standard_identifier: "check",
      // Scheme identifier (e.g. GTIN)
      item_standard_identifier_scheme: "0160",
      item_country_of_origin: product.fiscal_country_codes,
      item_type: getTypeItem(product.categ_id?.[1]),
      // Type of goods or services subject to RCM
      type_of_goods_or_services: product.categ_id[1],
      // Invoice line amount with tax in AED 
      line_amount_in_aed: invoice_product.price_total,
      // VAT line amount in AED 
      vat_line_amount_in_aed: (invoice_product.price_total-invoice_product.price_subtotal),
      allowances: [],
      charges: [],
      vat_info: [
        {
          vat_category_code: "S",
          vat_rate: "5.00",
          tax_scheme: "VAT",
          vat_exemption_reason_text: "",
          vat_exemption_reason_code: "",
        },
      ],
      attributes: [
        // {
        //   name: "Color",
        //   value: "Mixed",
        // },
        // {
        //   name: "Packaging",
        //   value: "Standard Box",
        // },
      ],
      classifications: [
        {
          classification_identifier: "49019900",
          classification_identifier_scheme: "HS",
          classification_identifier_scheme_version: "2022",
        },
      ],
      // service_accounting_codes: [
      //   {
      //     code: "4920",
      //     scheme_identifier: "SAC",
      //     scheme_version_identifier: "20.1001",
      //   },
      // ],
    });
  }
  // await writeFileData(items,"products-by-invoice")
  // console.log(items);

  return items;
}

function getTypeItem(type) {
  switch (type) {
    case "goods" || "Goods":
      return "G";
    case "services" || "Services":
      return "S";
    case "both" || "Both":
      return "B";
    default:
      return null;
  }
}

module.exports = mapLines;
