const { getIvoicePaymnetDetails } = require("../repositories/account.payment");

async function mapPaymentInstructions(matched_payment_ids=[]) {
  const payments = [];
  console.log("matched_payment_ids");
  console.log(matched_payment_ids.length);
  const isEmpty = matched_payment_ids.length
  if(!isEmpty) return []
  for (const payment_id of matched_payment_ids) {
    const { data: payment } = await getIvoicePaymnetDetails(payment_id);
    console.log("payment");
    console.log(payment);

    payments.push({
      //description of the payment means
      payment_means_text: `${payment.journal_id[1]} Transfer`,
      // Payment means type code
      payment_means_type_code: getPaymentMeansTypeCode(payment.journal_id[1]),
      // Identifier for the payment instructions
      payment_instructions_id: payment.display_name,
    });
  }

  return payments;
}

function getPaymentMeansTypeCode(paymentType='cash') {
  switch (paymentType.toLowerCase()) {
    case "back":
      return "30";
    case "cash":
      return "10";
    case "card":
      return "48";
    default:
      return null;
  }
}

module.exports = mapPaymentInstructions;
