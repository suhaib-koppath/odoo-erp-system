const { response } = require("express");
const fat = require("../services/fat");
const { readFileData, writeFileData } = require("../utils/handleFileData");

const Resubmit = async (req, res) => {
  try {
    const { status } = req.params;
    const invoices = await getReadFileByStatus(status);

    const ERRORS = [];
    const RESPONSES = [];
    for (const invoice of invoices) {
      try {
        const { data: invoices } = await fat.put(
          `/invoices/${invoice.data.id}/resubmit`,
          {
            name: invoice.data.name,
            // invoice_number: invoice.data.invoice_number,
            issue_date: invoice.data.issue_date,
            invoice_type_code: invoice.data.invoice_type_code,
            detail: invoice.data.detail,

          },
          {
            headers: {
              Authorization: `Bearer ${req.user}`,
            },
          },
        );
        RESPONSES.push(invoices);
      } catch (error) {
        ERRORS.push({
          error: error.response?.data || error.message,
          id: invoice.id,
          invoice_name: invoice.name,
        });
      }
    }

    await writeFileData("",'rejected-invoices-data')
    await writeFileData("",'failed-invoices-data')

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

module.exports = Resubmit;

async function getReadFileByStatus(status = "") {
  switch (status.toLowerCase()) {
    case "rejected":
      return readFileData("rejected-invoices-data");
    case "failed":
      return readFileData("failed-invoices-data");
    default:
      null;
  }
}
