// ACCOUNT RECEVABLE CONTROLLERS

const { getAllCustomer } = require("../../repositories/customer.repo");

const readAllCutomer= async (req, res) => {
  try {
    const {data:customers} = await getAllCustomer();
    return res.status(200).json({
      success: true,
      message: "Cutomers fetched successfully",
      data: customers,
      
    });
  } catch (error) {
    console.error("Get Cutomers error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch Cutomers",
      error_message: error.message,
      error
    });
  }
};

module.exports = readAllCutomer
