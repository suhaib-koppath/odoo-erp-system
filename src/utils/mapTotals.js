const mapTotals = (invoice) => {
  const amountTotal = parseFloat(invoice.amount_total || 0);
  const amountResidual = parseFloat(invoice.amount_residual || 0);
  const amountUntaxed = parseFloat(invoice.amount_untaxed || 0);
  const amountTax = parseFloat(invoice.amount_tax || 0);
console.log("Buyer");
  console.log(invoice.amount_total);
  console.log(invoice.amount_residual);
  console.log(invoice.amount_untaxed);
  console.log(invoice.amount_total);

  console.log("End Buyer");
  const formattedTotals = {
    // Sum of all invoice line net amounts (Total before adding tax).
    sum_of_invoice_line_net_amount: amountUntaxed.toFixed(2),

    sum_of_allowances_on_document_level: "0.00",

    sum_of_charges_on_document_level: "0.00",

    invoice_total_amount_without_vat: amountUntaxed.toFixed(2),

    invoice_total_vat_amount: amountTax.toFixed(2),

    invoice_total_amount_with_vat: amountTotal.toFixed(2),

    paid_amount: (amountTotal - amountResidual).toFixed(2),

    rounding_amount: "0.00",

    amount_due_for_payment: amountResidual.toFixed(2),

    invoice_total_amount_with_vat_in_aed: amountTotal.toFixed(2),

    tax_included_indicator: invoice.company_price_include === "tax_included",
  };

  return formattedTotals;
};

module.exports = mapTotals