const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const ratingDao = require("../../dao/rating-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
    rating: {type: "numeric"},
    recipeId: { type: "string", minLength: 32, maxLength: 32 },
    userId: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["id","rating","recipeId","userId"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
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

    const updatedRating = ratingDao.update(rating);
    if (!updatedRating) {
      res.status(404).json({
        code: "ratingNotFound",
        message: `Rating ${rating.id} not found`,
      });
      return;
    }

    res.json(updatedRating);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
