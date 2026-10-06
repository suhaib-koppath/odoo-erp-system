function mapVatBreakdown(invoice){
    return  [
        {
          taxable_amount: "9700.00",
          tax_amount: "485.00",
          vat_category_code: "S",
          tax_scheme_code: "VAT",
          vat_category_rate: "5.00",
        },
      ]
}

module.exports = mapVatBreakdown