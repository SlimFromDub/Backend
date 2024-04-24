const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/rating/getAbl");
const ListAbl = require("../abl/rating/listAbl");
const CreateAbl = require("../abl/rating/createAbl");
const UpdateAbl = require("../abl/rating/updateAbl");
const DeleteAbl = require("../abl/rating/deleteAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;