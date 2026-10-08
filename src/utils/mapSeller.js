const { getCompanyById } = require("../repositories/res.company");
const mapPaymentInstructions = require("./mapPaymentInstructions");

const mapSeller = async (invoice) => {
  const { data: company } = await getCompanyById({
    companyId: invoice.company_id[0],
  });

 

  if (!company) throw new Error("Company Is Not Fonded");
  const odooSeller = company[0];
  return {
    name: odooSeller.name ?? "",
    // Trading name of the seller if different from legal name
    trading_name: "",
    // Seller legal registration identifier (e.g. trade license number)
    legal_registration_identifier: 1289653724,
    // Scheme identifier for seller legal registration ID
    legal_registration_identifier_scheme: "",
    // Seller VAT identifier (TRN)
    vat_identifier: 128965372400000, //  odooSeller.vat? odooSeller.vat: "",
    // Tax scheme for seller VAT identifier (e.g. VAT)
    tax_scheme: "VAT",

    tax_registration_identifier: null,
    // Tax scheme for the additional tax registration identifier
    tax_registration_tax_scheme: null,
    // Additional legal details of the seller (e.g., Share Capital, Company Type). Optional.
    additional_legal_information: null,
    // Seller electronic address (e.g. Peppol ID)
    electronic_address: 1289653724,
    // Scheme identifier for seller's electronic address (e.g., 0235 for UAE).
    // Electronic address scheme ID. Always '0235' for UAE participants.
    electronic_address_scheme: "0235",
    // Seller address line 1 (street and number)
    address_line_1: odooSeller.street ? odooSeller.street : "",
    // Seller address line 2
    address_line_2: odooSeller.street2 ? odooSeller.street2 : "",
    // Seller address line 3
    address_line_3: "",
    // Seller city name
    city: odooSeller.city ? odooSeller.city : "",
    // Seller postal code
    post_code: odooSeller.zip ? odooSeller.zip : "",
    // Seller country subdivision (state/province/emirate)
    country_subdivision: "",

    country_code: odooSeller.country_code ? odooSeller.country_code : "AE",
    // Contact person name at the seller
    contact_point: "",
    // Contact telephone number at the seller
    contact_telephone_number: odooSeller.phone ?? "",
    // Contact email address at the seller
    contact_email_address: odooSeller.email ?? "",
    // Name of the authority that issued the seller registration
    authority_name: "Dubai Department of Economic Development",

    // Type of seller's legal registration document
    // (e.g., 'TL' for Trade License, 'EID' for Emirates ID).
    legal_registration_identifier_type: "TL",
    //  Passport Issuing Country Code
    passport_issuing_country_code: "",
    // Ensure at least one seller ID is provided

    payment_instructions:await mapPaymentInstructions(),
    identifiers: [
      {
        identifier: "1289653724",
        identifier_scheme: "0234",
      },
    ],
  };
};

module.exports = mapSeller;
