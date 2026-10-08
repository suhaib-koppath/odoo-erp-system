// ACCOUNT RECEVABLE CONTROLLERS

const axios = require("axios");
const fat = require("../services/fat");
const mapInvoiceToTca = require("../utils/mapInvoiceToTca ");
const {
  createInvoice,
  updateInvoiceByOdooInvoiceId,
} = require("../repositories/invoiceMongo.repo");

function replaceWhitespaceWithUnderscore(text) {
  // Replaces all types of whitespace (spaces, tabs, newlines) with an underscore
  return text.replace(/[\s/]+/g, "_");
}

const TodayOdooInvoiceSend = async (req, res) => {
  try {
    const { invoices, token } = req.user;
    if (!invoices) throw new Error("Odoo Invoices Is Not Founded");

    const ERRORS = [];
    const RESPONSES = [];

    for (const invoice of invoices) {
      try {
        if(!invoice.name) throw new Error("The invoice is still in draft");
        
        const formatedInvoice = await mapInvoiceToTca(invoice);
        await createInvoice({
          odooInvoiceId: invoice.id,
          odooInvoiceCreateDate: invoice.date,
          odooInvoiceName: formatedInvoice.name,
        });
        // UPLOADING START
        console.log(formatedInvoice.name);
        // STEP 1
        const { data: fileUploadingSlot } = await fat.post(
          "/documents",
          {
            name: `${replaceWhitespaceWithUnderscore(formatedInvoice.name)}`,
            extension: "json",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        console.log("STEP 1 COMPLETED");

        // STEP 2
        const { path: filePath, upload_url: uploadUrl } = fileUploadingSlot;

        await axios.put(uploadUrl, formatedInvoice);
        console.log("STEP 2 COMPLETED");

        // STEP 3
        const { data: responseInvoice } = await fat.post(
          "/invoices",
          {
            ...formatedInvoice,
            source: filePath,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        RESPONSES.push(responseInvoice);

        console.log("STEP 3 COMPLETED");
        await updateInvoiceByOdooInvoiceId(invoice.id, {
          status: "complete",
          platformInvoiceId: responseInvoice.id,
          platformSentDate: responseInvoice.created_at,
        });
      } catch (error) {
        ERRORS.push({
          name: invoice.name ,
          id: invoice.id ,
          error_data: error.response?.data || error.message || "",
        });
        continue;
      }
    }
    return res.status(200).json({
      success: true,
      message: "success",
      responses: RESPONSES,
      errors: ERRORS,
    });
  } catch (error) {
    console.error("Get Invoices error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch Invoices",
      error: error.response?.data || error.message || "",
    });
  }
};

module.exports = TodayOdooInvoiceSend;
