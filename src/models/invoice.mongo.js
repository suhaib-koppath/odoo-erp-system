const mongoose =require("mongoose");
const invoiceSchema = new mongoose.Schema(
  {
    odooInvoiceId: {
      type: Number,
      required: true,
    },

    odooInvoiceCreateDate: {
      type: Date,
      required: true,
    },

    odooInvoiceName: {
      type: String,
      required: true,
    },

    platformInvoiceId: {
      type: String,
      default: null,
    },

    platformSentDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "complete"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;