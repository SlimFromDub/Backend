const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const cuisineDao = require("../../dao/cuisine-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
    name: { type: "string"},
    description: { type: "string"},
  },
  required: ["id","name","description"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let cuisine = req.body;

    // validate input
    const valid = ajv.validate(schema, cuisine);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const cuisineList = cuisineDao.list();
    const emailExists = cuisineList.some(
      (u) => u.email === cuisine.email && u.id !== cuisine.id
    );
    if (emailExists) {
      res.status(400).json({
        code: "emailAlreadyExists",
        message: `Cuisine with email ${cuisine.email} already exists`,
      });
      return;
    }

    const updatedCuisine = cuisineDao.update(cuisine);
    if (!updatedCuisine) {
      res.status(404).json({
        code: "cuisineNotFound",
        message: `Cuisine ${cuisine.id} not found`,
      });
      return;
    }

    res.json(updatedCuisine);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
