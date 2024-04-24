const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const commentDao = require("../../dao/comment-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
    text: { type: "string"},
    level: { type: "number"},
    picture: { "type": "string",  "contentEncoding": "base64",  "contentMediaType": "image/png"},
    dateOfComment: { type: "string", "format": "date"},
    commentId: { type: "string", minLength: 32, maxLength: 32 },
    userId: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["id","text","level","dateOfComment","commentID","commentID"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
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

    const updatedComment = commentDao.update(comment);
    if (!updatedComment) {
      res.status(404).json({
        code: "commentNotFound",
        message: `Comment ${comment.id} not found`,
      });
      return;
    }

    res.json(updatedComment);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
