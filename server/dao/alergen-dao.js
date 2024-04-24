const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const alergenFolderPath = path.join(__dirname, "storage", "alergenList");

// Method to read an alergen from a file
function get(alergenId) {
  try {
    const filePath = path.join(alergenFolderPath, `${alergenId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadAlergen", message: error.message };
  }
}

// Method to write an alergen to a file
function create(alergen) {
  try {
    alergen.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(alergenFolderPath, `${alergen.id}.json`);
    const fileData = JSON.stringify(alergen);
    fs.writeFileSync(filePath, fileData, "utf8");
    return alergen;
  } catch (error) {
    throw { code: "failedToCreateAlergen", message: error.message };
  }
}

// Method to update alergen in a file
function update(alergen) {
  try {
    const currentAlergen = get(alergen.id);
    if (!currentAlergen) return null;
    const newAlergen = { ...currentAlergen, ...alergen };
    const filePath = path.join(AlergenFolderPath, `${alergen.id}.json`);
    const fileData = JSON.stringify(newAlergen);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newAlergen;
  } catch (error) {
    throw { code: "failedToUpdateAlergen", message: error.message };
  }
}

// Method to remove an alergen from a file
function remove(alergenId) {
  try {
    const filePath = path.join(alergenFolderPath, `${alergenId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveAlergen", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
};
