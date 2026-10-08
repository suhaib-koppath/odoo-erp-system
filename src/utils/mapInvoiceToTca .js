const { getIvoiceProductDetails } = require("../repositories/account.move.line");
const getCurrencyCode = require("./getCurrencyCode");
const getInvoiceTypeCode = require("./getInvoiceTypeCode");
const mapBuyer = require("./mapBuyer");
const mapLines = require("./mapLines");
const mapPaymentInstructions = require("./mapPaymentInstructions");
const mapSeller = require("./mapSeller");
const mapTotals = require("./mapTotals");
const mapVatBreakdown = require("./mapVatBreackdowns");

const mapInvoiceToTca = async (odooInvoice) => {
  return {
    name: `${odooInvoice.type_name} ${odooInvoice.name}`,
    invoice_number: odooInvoice.name,
    issue_date: odooInvoice.invoice_date || odooInvoice.date,
    invoice_type_code: getInvoiceTypeCode(odooInvoice.move_type),
    detail: {
      payment_due_date: odooInvoice.invoice_date_due?odooInvoice.invoice_date_due: "",
      payment_instructions: await mapPaymentInstructions(odooInvoice.matched_payment_ids),
      invoice_currency_code: getCurrencyCode(odooInvoice.currency_id),
      // check 
      buyer_reference:odooInvoice.ref || odooInvoice.display_name || "",

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
