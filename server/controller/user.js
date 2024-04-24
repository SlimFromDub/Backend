const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/user/getAbl");
const CreateAbl = require("../abl/user/createAbl");
const UpdateAbl = require("../abl/user/updateAbl");
const DeleteAbl = require("../abl/user/deleteAbl");

router.get("/get", GetAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
