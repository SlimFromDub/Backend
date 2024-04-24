const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const alergenDao = require("../../dao/alergen-dao.js");

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
    let alergen = req.body;

    // validate input
    const valid = ajv.validate(schema, alergen);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const alergenList = alergenDao.list();
    const emailExists = alergenList.some((u) => u.email === alergen.email);
    if (emailExists) {
      res.status(400).json({
        code: "emailAlreadyExists",
        message: `Alergen with email ${alergen.email} already exists`,
      });
      return;
    }

    alergen = alergenDao.create(alergen);
    res.json(alergen);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
