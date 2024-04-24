const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const ratingDao = require("../../dao/rating-dao.js");

const schema = {
  type: "object",
  properties: {
    rating: {type: "numeric"},
    recipeId: { type: "string", minLength: 32, maxLength: 32 },
    userId: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["rating","recipeId","userId"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let rating = req.body;

    // validate input
    const valid = ajv.validate(schema, rating);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const ratingList = ratingDao.list();
    const emailExists = ratingList.some((u) => u.email === rating.email);
    if (emailExists) {
      res.status(400).json({
        code: "emailAlreadyExists",
        message: `Rating with email ${rating.email} already exists`,
      });
      return;
    }

    rating = ratingDao.create(rating);
    res.json(rating);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
