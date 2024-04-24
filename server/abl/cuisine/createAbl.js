const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const cuisineDao = require("../../dao/cuisine-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string"},
    description: { type: "string"},
  },
  required: ["name","description"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
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
    const emailExists = cuisineList.some((u) => u.email === cuisine.email);
    if (emailExists) {
      res.status(400).json({
        code: "emailAlreadyExists",
        message: `Cuisine with email ${cuisine.email} already exists`,
      });
      return;
    }

    cuisine = cuisineDao.create(cuisine);
    res.json(cuisine);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
