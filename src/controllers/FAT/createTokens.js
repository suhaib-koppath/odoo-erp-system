const fat = require("../../services/fat");
const { writeFileData } = require("../../utils/handleFileData");

const createTokens = async (req, res) => {
  try {
    
    
    const {data} = await fat.post('/oauth/token',{
        "client_id":process.env.FAT_CLIENT_ID,
        "client_secret":process.env.FAT_CLIENT_SECRET
    })

    const tokenData = {
    ...data,
    expires_at: Date.now() + ((data.expires_in * 1000)-3000)
  };

    await writeFileData(tokenData)
     return res.status(200).json({
      success: false,
      message: "Token Generated",
    });

  } catch (error) {
    console.error("Get Invoices error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to Tokens",
      error: error.message,
    });
  }
};

module.exports = createTokens
