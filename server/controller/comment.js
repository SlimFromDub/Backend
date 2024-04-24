const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/comment/getAbl");
const CreateAbl = require("../abl/comment/createAbl");
const UpdateAbl = require("../abl/comment/updateAbl");
const DeleteAbl = require("../abl/comment/deleteAbl");

router.get("/get", GetAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;