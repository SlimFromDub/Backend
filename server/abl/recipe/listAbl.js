const recipeDao = require("../../dao/recipe-dao.js");

async function ListAbl(req, res) {
  try {
    let recipeSearch = req.body;
    
    const recipeList = recipeDao.list();
    //const passCorr = recipeList.filter((recipeList) recipeList.name);
    res.json(recipeList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;