function mapPaymentInstructions(invoice) {
  return [
    {
      type_code: "30",
      payment_id: "INV/26-27/0003",
      payment_means_type_code: "B100",
    },
  ];
}

module.exports = mapPaymentInstructions