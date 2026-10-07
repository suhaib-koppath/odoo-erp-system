const fs = require("fs/promises");

async function readFileData(fileName = "tokens") {
  try {
    // READ FILE DATA 
    const file = await fs.readFile(`./data/${fileName}.json`, "utf-8");
    return file ? JSON.parse(file) : null;
  } catch (error) {
    if (error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}
async function writeFileData(data,fileName='tokens') {
  
    // CREATE FILE DATA
  await fs.writeFile(`./data/${fileName}.json`, JSON.stringify(data, null, 2));
}

module.exports = {
  readFileData,
  writeFileData,
};
