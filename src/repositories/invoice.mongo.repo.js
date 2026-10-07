const Invoice = require("../models/invoice.mongo");

const createInvoice = async ({
  odooInvoiceId,
  odooInvoiceCreateDate,
  odooInvoiceName,
  platformInvoiceId,
  platformSentDate,
}) => {
  const existingInvoice = await Invoice.findOne({
    odooInvoiceId,
  });

  if (existingInvoice?.status == "complete") {
    throw new Error("Invoice Already Existed");
  } else if (existingInvoice?.status == "pending") {
    return;
  }

  const invoice = await Invoice.create({
    odooInvoiceId,
    odooInvoiceCreateDate,
    odooInvoiceName,
    platformInvoiceId,
    platformSentDate,
  });

  return invoice;
};

const updateInvoiceByOdooInvoiceId = async (odooInvoiceId, data) => {
  return await Invoice.findOneAndUpdate(
    { odooInvoiceId },
    { $set: data },
    { new: true },
  );
};
module.exports = { createInvoice, updateInvoiceByOdooInvoiceId };
