const fat = require("../services/fat");
const { getAllOdooInvoiceByToday } = require("../repositories/account.move");

const todayInvoices = async (req, res, next) => {
  try {
    let page = 1;
    let limit = 1;
    const allTodayInvoices = [];
    do {
      const invoices = await getAllOdooInvoiceByToday(page, limit);
      allTodayInvoices.push(...invoices.data);
      page = invoices.nextPage;
    } while (page);
    const token = req.user;
    req.user = {
      token,
      invoices: allTodayInvoices,
    };
    next();
  } catch (error) {
    res.status(400).json({
      message: "failed",
      error: error.response?.data || error.message,
    });
  }
};

module.exports = todayInvoices;
