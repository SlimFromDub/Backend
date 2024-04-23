const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const userDao = require("../../dao/user-dao.js");

const schema = {
  type: "object",
  properties: {
    firstName: { type: "string"},
    lastName: { type: "string"},
    email: { type: "string", format: "email" },
    password: { type: "string", format: "password"},
    registrationDate: { type: "date", format: "date"},
  },
  required: ["firstName","lastName","password", "email"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let user = req.body;

    // validate input
    const valid = ajv.validate(schema, user);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const userList = userDao.list();
    const emailExists = userList.some((u) => u.email === user.email);
    if (emailExists) {
      res.status(400).json({
        code: "emailAlreadyExists",
        message: `User with email ${user.email} already exists`,
      });
      return;
    }

    user = userDao.create(user);
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
