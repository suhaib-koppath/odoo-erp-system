// ACCOUNT RECEVABLE CONTROLLERS

const { default: axios } = require("axios");
const fat = require("../config/fat");
const { getAllOdooInvoice } = require("../repositories/invoice.repo");
const mapInvoiceToTca = require("../utils/mapInvoiceToTca ");

function replaceWhitespaceWithUnderscore(text) {
  // Replaces all types of whitespace (spaces, tabs, newlines) with an underscore
  return text.replace(/[\s/]+/g, "_");
}

const uploadAndSubmitInvoice = async (req, res) => {
  try {
    const { data: invoices } = await getAllOdooInvoice();
    if (!invoices) throw new Error("Odoo Invoices Is Not Founded");

    const ERRORS = [];
    const RESPONSES = [];

    for (const invoice of invoices) {
      try {
        const formatedInvoice = await mapInvoiceToTca(invoice);
        //UPLOADING START
        console.log(formatedInvoice.name);
        // STEP 1
        const {data:fileUploadingSlot} = await fat.post(
          "/documents",
          {
            name: `${replaceWhitespaceWithUnderscore(formatedInvoice.name)}`,
            extension: "json",
          },
          {
            headers: {
              Authorization: `Bearer ${req.user}`,
              "Content-Type": "application/json",
            },
          },
        );
         console.log("STEP 1 COMPLETED");

        // STEP 2
        const {path:filePath,upload_url:uploadUrl} = fileUploadingSlot

        const fileUploading = await axios.put(uploadUrl, formatedInvoice);
        console.log("STEP 2 COMPLETED");

        // STEP 3
        const responseInvoice = await fat.post("/invoices", {
            ...formatedInvoice,
            source:filePath
        }, {
          headers: {
            Authorization: `Bearer ${req.user}`,
            "Content-Type": "application/json",
          },
        });
        RESPONSES.push(responseInvoice.data);
      } catch (error) {
        ERRORS.push({
          name: invoice.name,
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
      error: error.response.data || error.message || "",
    });
  }
};

module.exports = uploadAndSubmitInvoice;
