const fat = require("../config/fat");
const { getAllOdooCreaditNote } = require("../repositories/creaditnote.repo");
const mapInvoiceToTca = require("../utils/mapInvoiceToTca ");


const CreaditNote = async (req, res) => {
  try {
    const { data: creaditNotes } = await getAllOdooCreaditNote();
    if (!creaditNotes) throw new Error("Odoo Creadit Note Is Not Founded");

    const ERRORS = [];
    const RESPONSES = [];
    
    for (const creaditNote of creaditNotes) {
      try {
        const formatedInvoice = await mapInvoiceToTca(creaditNote,true);
        console.log(formatedInvoice);

        const {data} = await fat.post(
          "/invoices",
          formatedInvoice,
          {
            headers: {
              Authorization: `Bearer ${req.user}`,
              "Content-Type": "application/json",
            },
          },
        );
        RESPONSES.push(data);
      } catch (error) {
        ERRORS.push({
          name: creaditNote.name,
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
    // console.error("Get Invoices error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch Invoices",
      error: error.response.data || error.message || "",
    });
  }
};

module.exports = CreaditNote;
