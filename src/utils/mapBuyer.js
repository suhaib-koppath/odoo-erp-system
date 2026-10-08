const { getCustomerById } = require("../repositories/res.partner");

const mapBuyer = async (invoice) => {
  const { data: buyer } = await getCustomerById({
    customerId: invoice.partner_id[0],
  });
  if (!buyer) throw new Error("Buyer Is Not Fonded");

  const odooBuyer = buyer[0];
  return {
    // Full legal name of the buyer
    name: odooBuyer.name ?? "",
    // Trading name of the buyer if different from legal name
    trading_name: odooBuyer.name ?? "",
    // Buyer identifier
    identifier: odooBuyer.ref ? odooBuyer.ref : "",
    // Scheme identifier for buyer identifier
    identifier_scheme: "",
    // Buyer legal registration ID. Mandatory for UC14 (Invoice type 480 & Out of Scope of VAT).
    legal_registration_identifier: "LRI-789012",
    //  odooBuyer.additional_identifiers,
    //  Scheme identifier for buyer legal registration ID
    // Buyer legal registration document type (TL, EID, PAS, or CD).
    legal_registration_identifier_scheme: "TL",
    // Buyer VAT identifier (TRN)

    // check
    vat_identifier: 121312323300000,

    // Tax scheme for buyer VAT identifier (e.g. VAT)
    tax_scheme: "VAT",
    // odooBuyer.vat ? "VAT" : "",

    // Buyer electronic address (e.g. Peppol ID)
    electronic_address: 1213123233,
    // odooBuyer.routing_endpoint ?? "",

    // Scheme identifier for buyer electronic address
    // Always 0235 for UAE participants.
    electronic_address_scheme: "0235",

    address_line_1: odooBuyer.street ? odooBuyer.street : "",
    address_line_2: odooBuyer.street2 ? odooBuyer.street2 : "",
    address_line_3: "",
    city: odooBuyer.city ?? "",
    post_code: odooBuyer.zip ?? "",

    // Seller country subdivision (state/province/emirate)
    country_subdivision: null,

    country_code: odooBuyer.country_code ? odooBuyer.country_code : "AE",
    // Contact person name at the seller
    contact_point: "",
    // Contact telephone number at the seller
    contact_telephone_number: odooBuyer.phone
      ? odooBuyer.phone
      : "+971 2 123 4567",
    // Contact email address at the seller
    contact_email_address: odooBuyer.email ?? "",
    // Name of the authority that issued the seller registration
    authority_name: "Department of Economic Development — Dubai",

    // Type of seller's legal registration document
    // (e.g., 'TL' for Trade License, 'EID' for Emirates ID).
    legal_registration_identifier_type: "TL",
    //  Passport Issuing Country Code
    passport_issuing_country_code: "",

    // Beneficiary ID (FTZ TRN/TIN)
    beneficiary_identifier: "",
  };
};

module.exports = mapBuyer;
