const fat = require("../config/fat");
const { writeFileData, readFileData } = require("../utils/handleFileData");

const RejectedOrFailedInvoices = async (req, res) => {
  try {
    const rejectedFileData=await readFileData('rejected-invoices-data')
    const failededFileData=await readFileData('failed-invoices-data')
    if(rejectedFileData || failededFileData) {
      return res.status(400).json({
        message:"I need to resubmit the invoice after making the necessary changes."
      })
    }
    const rejectedCode = GetStatusCode("Rejected");
    const failedCode = GetStatusCode("Failed");
    const direction = GetDirection("Sent");
    async function getInvoices(Code) {
      const { data } = await fat.get(
        `/invoices/?status=${Code}&direction=${direction}`,
        {
          headers: {
            Authorization: `Bearer ${req.user}`,
          },
        }
      );
      return data.results;
    };
    const [RejectedInvoices, FailedInvoices] = await Promise.all([
      getInvoices(rejectedCode),
      getInvoices(failedCode),
    ]);

    const RejectedInvoicesError = [];
    const FailededInvoicesError = [];

    async function getInvoice (invoiceId) {
      const { data } = await fat.get(`/invoices/${invoiceId}/`,{
          headers: {
            Authorization: `Bearer ${req.user}`,
          },
        },);
      return data
    };
    function pushedObject (invoice){
      return {
        data:invoice,
        error_message: invoice.internal_validation_error_message,
      }
    }
    for (const RejectedInvoice of RejectedInvoices) {
      const invoice = await getInvoice(RejectedInvoice.id);
      RejectedInvoicesError.push(pushedObject(invoice));
      
      console.log(invoice);
    }
    for (const FailedInvoice of FailedInvoices) {
      const invoice = await getInvoice(FailedInvoice.id);
      FailededInvoicesError.push(pushedObject(invoice));
    }
    await writeFileData(RejectedInvoicesError,'rejected-invoices-data')
    await writeFileData(FailededInvoicesError,'failed-invoices-data')

    return res.status(200).json({
      success: true,
      message: "success",
      rejectedInvoices: RejectedInvoicesError,
      failedInvoices: FailededInvoicesError,
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

module.exports = RejectedOrFailedInvoices;

function GetStatusCode(status = "something") {
  switch (status.toLowerCase()) {
    case "processing":
      return "1";
    case "completed":
      return "2";
    case "rejected":
      return "3";
    case "failed":
      return "4";
    default:
      return "1";
  }
}

function GetDirection(direction = "something") {
  switch (direction.toLowerCase()) {
    case "sent":
      return "1";
    case "received":
      return "2";
    default:
      return "1";
  }
}
