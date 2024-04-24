const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const commentDao = require("../../dao/comment-dao.js");

const schema = {
  type: "object",
  properties: {
    text: { type: "string"},
    level: { type: "number"},
    picture: { "type": "string",  "contentEncoding": "base64",  "contentMediaType": "image/png"},
    dateOfComment: { type: "string", "format": "date"},
    commentID: { type: "string", minLength: 32, maxLength: 32 },
    userId: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["text","level","dateOfComment","commentID","commentID"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let comment = req.body;

    // validate input
    const valid = ajv.validate(schema, comment);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const commentList = commentDao.list();
    const emailExists = commentList.some((u) => u.email === comment.email);
    if (emailExists) {
      res.status(400).json({
        code: "emailAlreadyExists",
        message: `Comment with email ${comment.email} already exists`,
      });
      return;
    }

    comment = commentDao.create(comment);
    res.json(comment);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
