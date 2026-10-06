// CUSTOMER ROUTES


const express = require("express");
const createTokens = require("../controllers/FAT/createTokens");
const router = express.Router();

// GET ALL BILL 
router.post("/create-tokens",createTokens)

module.exports =  router;
