const express = require("express");
const https = require("https");
const fs = require("fs");

require("dotenv/config");

const Fta_Routes = require("./routes/fatRoutes");
const ERP_Routes = require("./routes/erpRoutes");

const authMiddleware = require("./middleware/authMiddileware");
const connectDB = require("./config/connectDB");

const port = process.env.PORT;
const app = express();

app.use(express.json());

 connectDB()


// FAT APIS 
app.use("/api/fat",Fta_Routes );
app.use("/api/erp",ERP_Routes );
app.get("/",authMiddleware, async (req, res) => {
  try {
    console.log("HTTPS backend is running");
    res.json({
      message: "HTTPS backend is running",
      middleware: req.user
    });
  } catch (error) {
    res.json({
      message: "Server Error",
      error_message: error.response?.data || error.message,
      error,
    });
  }
});

const httpsOptions = {
  key: fs.readFileSync("./certs/localhost+2-key.pem"),
  cert: fs.readFileSync("./certs/localhost+2.pem"),
};

https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`HTTPS server running at https://localhost:${port}`);
});
