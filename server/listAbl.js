const recipeDao = require("../../dao/recipe-dao.js");
const cuisineDao = require("../../dao/cuisine-dao.js");
const alergenDao = require("../../dao/cuisine-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string"},
    cuisineId: { type: "string" },
    ingredientList: {
                      "type": "object",       
                      "properties": 
                      {
                      name: { type: "string"},
                      }
                    }
                },
};

async function ListAbl(req, res) {
  try {
    let recipeSearch = req.body;
    
    const recipeList = recipeDao.list();
    const pecipeFilter = recipeList.find((u)=> (u.name===recipeSearch.name || u.cuisineId===recipeSearch.cuisineId || 
    u.ingredientList.name===recipeSearch.ingredientList.name));
    res.json(pecipeFilter);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;