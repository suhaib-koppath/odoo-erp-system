// const { getOdooCreaditNotesByToday } = require("../../repositories/account.move");
// const mapInvoiceToTca = require("../../utils/mapInvoiceToTca ");

// const getTestOdooCreaditNotes = async (req, res) => {
//   try {
//     const {data:CreaditNotes} = await getOdooCreaditNotesByToday();
//     console.log(CreaditNotes);
    
//     if(!CreaditNotes.length) throw new Error("Creadit Note Is Not Available");
//     if(!CreaditNotes?.[0].name) throw new Error("The Creaditnote is still in draft");
//     const formatedInvoice = await mapInvoiceToTca(CreaditNotes);
//     return res.status(200).json({
//       success: true,
//       message: "success",
//       map_invoice:formatedInvoice,
//       creaditnote:CreaditNotes[0]
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch Invoices",
//       error: error.response?.data || error.message || "",
//     });
//   }
// };

// module.exports = getTestOdooCreaditNotes;
