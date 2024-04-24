const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const recipeDao = require("../../dao/recipe-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
    name: { type: "string"},
    instruction: { type: "string"},
    image: { "type": "string",  "contentEncoding": "base64",  "contentMediaType": "image/png" },
    averageRating: { type: "string", format: "password"},
    cuisineId: { type: "string" },
    ingredientList: {
                      "type": "object",       
                      "properties": 
                      {
                      name: { type: "string"},
                      amount: { type: "number"},
                      unitOdMeasure: { enum: ["ml", "g", "tsp","tbsp","cup" ]},
                      }
    }
  },
  required: ["id","name","instruction","image","cuisineId"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let recipe = req.body;

    // validate input
    const valid = ajv.validate(schema, recipe);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const updatedRecipe = recipeDao.update(recipe);
    if (!updatedRecipe) {
      res.status(404).json({
        code: "recipeNotFound",
        message: `Recipe ${recipe.id} not found`,
      });
      return;
    }

    res.json(updatedRecipe);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
