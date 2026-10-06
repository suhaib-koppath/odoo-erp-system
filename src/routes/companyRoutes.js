// CUSTOMER ROUTES


const express = require("express");
const readAllCompany = require("../controllers/companyControllers/readAllCompany");

const router = express.Router();

// GET ALL COMPANYS 
router.get("/read-all",readAllCompany)


module.exports =  router;