const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/cuisine/getAbl");
const CreateAbl = require("../abl/cuisine/createAbl");
const UpdateAbl = require("../abl/cuisine/updateAbl");
const DeleteAbl = require("../abl/cuisine/deleteAbl");

router.get("/get", GetAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;