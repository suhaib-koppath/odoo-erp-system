const { getIvoiceProductDetails } = require("../repositories/product.repo");
const getCurrencyCode = require("./getCurrencyCode");
const getInvoiceTypeCode = require("./getInvoiceTypeCode");
const mapBuyer = require("./mapBuyer");
const mapLines = require("./mapLines");
const mapPaymentInstructions = require("./mapPaymentInstructions");
const mapSeller = require("./mapSeller");
const mapTotals = require("./mapTotals");
const mapVatBreakdown = require("./mapVatBreackdowns");

const mapInvoiceToTca = async (odooInvoice, creaditNote) => {
  let fileds = {};
  if (creaditNote && odooInvoice.reversed_entry_id)
    fileds = {
      detail: {
        preceding_invoice_references:"81",
        discrepancy_response_code: "DL8.61.1.A",
        preceding_invoice_references: [
          {
            preceding_invoice_reference: odooInvoice.reversed_entry_id[1],
          },
        ],
        credit_note_reason: "Order Cancelled / Returned",
      },
    };
  return {
    name: `Invoice ${odooInvoice.name}`,
    invoice_number: odooInvoice.name,
    issue_date: odooInvoice.invoice_date || odooInvoice.date,
    invoice_type_code: getInvoiceTypeCode(odooInvoice.move_type),
    detail: {
      ...fileds.detail,
      payment_due_date: odooInvoice.invoice_date_due ?? "",
      payment_instructions: mapPaymentInstructions(odooInvoice),
      invoice_currency_code: getCurrencyCode(odooInvoice.currency_id),
      buyer_reference:
        odooInvoice.routing_identifier || odooInvoice.payment_reference || "",

      seller: await mapSeller(odooInvoice),
      buyer: await mapBuyer(odooInvoice),
      totals: mapTotals(odooInvoice),
      vat_breakdowns: mapVatBreakdown(odooInvoice),
      lines: await mapLines(odooInvoice),
      process_control: {
        profile_id: "urn:peppol:bis:billing",
        customization_id: "urn:peppol:pint:billing-1@ae-1",
      },
      transaction_type_code: "00000000",
    },
  };
};

module.exports = mapInvoiceToTca;
