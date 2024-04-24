const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const alergenDao = require("../../dao/alergen-dao.js");

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
    const emailExists = alergenList.some(
      (u) => u.email === alergen.email && u.id !== alergen.id
    );
    if (emailExists) {
      res.status(400).json({
        code: "emailAlreadyExists",
        message: `Alergen with email ${alergen.email} already exists`,
      });
      return;
    }

    const updatedAlergen = alergenDao.update(alergen);
    if (!updatedAlergen) {
      res.status(404).json({
        code: "alergenNotFound",
        message: `Alergen ${alergen.id} not found`,
      });
      return;
    }

    res.json(updatedAlergen);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
