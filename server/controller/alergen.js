const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/alergen/getAbl");
const CreateAbl = require("../abl/alergen/createAbl");
const UpdateAbl = require("../abl/alergen/updateAbl");
const DeleteAbl = require("../abl/alergen/deleteAbl");

router.get("/get", GetAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;