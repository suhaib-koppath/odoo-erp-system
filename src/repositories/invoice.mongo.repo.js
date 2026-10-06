const Invoice = require("../models/invoice.mongo");

 const createInvoice = async ({
  odooInvoiceId,
  odooInvoiceCreateDate,
  odooInvoiceName,
  platformInvoiceId,
  platformSentDate,
}) => {
  try {
    const invoice = await Invoice.create({
      odooInvoiceId,
      odooInvoiceCreateDate,
      odooInvoiceName,
      platformInvoiceId,
      platformSentDate,
    });

    return invoice;
  } catch (error) {
    console.error("Failed to create invoice:", error.message);
    throw error;
  }
};

module.exports =createInvoice