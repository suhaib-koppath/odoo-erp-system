// ACCOUNT PAYBLE ROUTES


const express = require("express");
const readAllBills = require("../controllers/billControllers/readAllBills");

const router = express.Router();

// GET ALL BILL 
router.get("/read-all",readAllBills)


module.exports =  router;