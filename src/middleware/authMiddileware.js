const fat = require("../config/fat");
const { readFileData, writeFileData } = require("../utils/handleFileData");
const isTokenValid = require("../utils/isTokenValid");

const authMiddleware = async (req, res, next) => {
  const fileData = await readFileData();

  const isValid = await isTokenValid(fileData.expires_at);
  if (!fileData?.expires_at || !fileData?.refresh_token || !fileData?.access_token)
    res.status(401).json({
      message: "please generate your access token",
    });

  if (!isValid) {
    const { data } = await fat.post("/oauth/token/refresh", {
      refresh_token: fileData.refresh_token,
    });
    const tokenData = {
      ...data,
      expires_at: Date.now() + data.expires_in * 1000,
    };
    await writeFileData(tokenData);
    req.user = tokenData.access_token;
    next();
  } else {
    req.user = fileData.access_token;
    next();
  }
};

module.exports = authMiddleware;
