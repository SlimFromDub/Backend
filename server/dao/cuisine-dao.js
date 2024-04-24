const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const cuisineFolderPath = path.join(__dirname, "storage", "cuisineList");

// Method to read an cuisine from a file
function get(cuisineId) {
  try {
    const filePath = path.join(cuisineFolderPath, `${cuisineId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadCuisine", message: error.message };
  }
}

// Method to write an cuisine to a file
function create(cuisine) {
  try {
    cuisine.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(cuisineFolderPath, `${cuisine.id}.json`);
    const fileData = JSON.stringify(cuisine);
    fs.writeFileSync(filePath, fileData, "utf8");
    return cuisine;
  } catch (error) {
    throw { code: "failedToCreateCuisine", message: error.message };
  }
}

// Method to update cuisine in a file
function update(cuisine) {
  try {
    const currentCuisine = get(cuisine.id);
    if (!currentCuisine) return null;
    const newCuisine = { ...currentCuisine, ...cuisine };
    const filePath = path.join(cuisineFolderPath, `${cuisine.id}.json`);
    const fileData = JSON.stringify(newCuisine);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newCuisine;
  } catch (error) {
    throw { code: "failedToUpdateCuisine", message: error.message };
  }
}

// Method to remove an cuisine from a file
function remove(cuisineId) {
  try {
    const filePath = path.join(cuisineFolderPath, `${cuisineId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveCuisine", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
};
