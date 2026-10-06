const { getIvoiceProductDetails } = require("../repositories/product.repo");
const { writeFileData } = require("./handleFileData");

async function mapLines(invoice) {
  const items = [];
  // console.log(invoice.invoice_line_ids);
  for (const line_id of invoice.invoice_line_ids) {
    const { data } = await getIvoiceProductDetails(line_id);
    items.push({
      line_id: data.id,
      note: "Supply and delivery of office supplies as per quotation QT-2026-001",
      object_identifier: "PO-LINE-001",
      object_identifier_scheme: "AAJ",
      invoiced_quantity: data.quantity,
      invoiced_quantity_unit_of_measure_code: data.product_uom_id[0],
      line_net_amount: "10000.00",
      purchase_order_line_reference: "PO-2026-001-L1",
      buyer_accounting_reference: "COST-CENTER-001",
      purchase_order_reference: "PO-2026-001",
      despatch_advice_reference: "DESPATCH-2026-001",
      batch_number: "BATCH-2026-001",
      line_period_start_date: "2026-05-01",
      line_period_end_date: "2026-05-15",
      item_net_price: data.price_subtotal,
      item_price_discount: data.discount,
      item_gross_price: data.price_total,
      item_price_base_quantity: data.price_unit,
      item_price_base_quantity_unit_of_measure_code: "EA",
      item_name: data.product_id[1],
      item_description:"",
      item_sellers_identifier: "ITEM-SEL-12345",
      item_buyers_identifier: "ITEM-BUY-54321",
      item_standard_identifier: "5901234123457",
      item_standard_identifier_scheme: "0160",
      item_country_of_origin: "AE",
      item_type: "G",
      type_of_goods_or_services: null,
      line_amount_in_aed: "10000.00",
      vat_line_amount_in_aed: "500.00",
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
    },);
  }
  // await writeFileData(items,"products-by-invoice")
  // console.log(items);

  return items;
}

module.exports = mapLines;
