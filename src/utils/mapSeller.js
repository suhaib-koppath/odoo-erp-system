const { getCompanyById } = require("../repositories/company.repo");

const mapSeller = async (invoice) => {
  const { data: company } = await getCompanyById({
    companyId: invoice.company_id[0],
  });
  if (!company) throw new Error("Company Is Not Fonded");
  const odooSeller = company[0];
  return {
    name: odooSeller.name ?? "",

    trading_name: "",

    legal_registration_identifier: "",

    legal_registration_identifier_scheme: "",

    vat_identifier: 128965372400000,
    //  odooSeller.vat? odooSeller.vat: "",

    tax_scheme: "",

    tax_registration_identifier: "",

    tax_registration_tax_scheme: "",

    additional_legal_information: "",

    electronic_address: 1289653724,

    electronic_address_scheme: "",

    address_line_1: odooSeller.street? odooSeller.street: "",

    address_line_2: odooSeller.street2?odooSeller.street2:"",

    address_line_3: "",

    city: odooSeller.city ?  odooSeller.city: "",

    post_code: odooSeller.zip ? odooSeller.zip : "",

    country_subdivision: "",

    country_code: odooSeller.country_code? odooSeller.country_code:"AE",

    contact_point: "",

    contact_telephone_number: odooSeller.phone ?? "",

    contact_email_address: odooSeller.email ?? "",

    authority_name: "",

    legal_registration_identifier_type: "",

    passport_issuing_country_code: "",

    identifiers: [],
  };
};

module.exports = mapSeller