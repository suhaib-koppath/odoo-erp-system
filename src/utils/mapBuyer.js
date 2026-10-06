const { getCustomerById } = require("../repositories/customer.repo");

const mapBuyer = async (invoice) => {
  const { data: buyer } = await getCustomerById({
    customerId: invoice.partner_id[0],
  });
  if (!buyer) throw new Error("Buyer Is Not Fonded");
  const odooBuyer = buyer[0];
  return {
    name: odooBuyer.name ?? "",

    trading_name: odooBuyer.name ?? "",

    identifier: odooBuyer.ref ? odooBuyer.ref : "",

    identifier_scheme: "",

    legal_registration_identifier: "",
    //  odooBuyer.additional_identifiers
    legal_registration_identifier_scheme: "",

    vat_identifier: odooBuyer.vat ? odooBuyer.vat : "",

    tax_scheme: odooBuyer.vat ? "VAT" : "",

    electronic_address: 1213123233,
    // odooBuyer.routing_endpoint ?? "",

    electronic_address_scheme: '',
    // odooBuyer.routing_scheme ?? "",

    address_line_1: odooBuyer.street ? odooBuyer.street : "",

    address_line_2: odooBuyer.street2 ? odooBuyer.street2 : "",

    address_line_3: "",

    city: odooBuyer.city ?? "",

    post_code: odooBuyer.zip ?? "",

    country_subdivision: odooBuyer.state_id?.[1] ?? "",

    country_code: odooBuyer.country_code? odooBuyer.country_code:"AE",

    country_subdivision:"AUH",

    contact_point: odooBuyer.name ?? "",

    contact_telephone_number: odooBuyer.phone || "",

    contact_email_address: odooBuyer.email ?? "",

    beneficiary_identifier: "",

    authority_name: "",

    legal_registration_identifier_type: "",

    passport_issuing_country_code: "",
  };
};

module.exports = mapBuyer;
