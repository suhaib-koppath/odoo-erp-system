function getInvoiceTypeCode (moveType)  {
  switch (moveType) {
    case "out_invoice":
      return "380";

    case "out_refund":
      return "381";

  }
};
module.exports = getInvoiceTypeCode