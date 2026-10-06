// ACCOUNT RECEVABLE CONTROLLERS

const { getAllBill } = require("../../repositories/bill.repo");


const readAllBills = async (req, res) => {
  try {
    const {data:bill} = await getAllBill();
    return res.status(200).json({
      success: true,
      message: "Bills fetched successfully",
      data: bill,
      
    });
  } catch (error) {
    console.error("Get Bills error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch Bills",
      error_message: error.message,
      error
    });
  }
};

module.exports = readAllBills
