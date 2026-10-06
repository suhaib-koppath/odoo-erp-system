// CUSTOMER ROUTES


const express = require("express");
const readAllCutomer = require("../controllers/cutomerControllers/readAllCustomer");

const router = express.Router();

// GET ALL BILL 
router.get("/read-all",readAllCutomer)


module.exports =  router;