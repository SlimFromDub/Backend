const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const commentFolderPath = path.join(__dirname, "storage", "commentList");

// Method to read an comment from a file
function get(commentId) {
  try {
    const filePath = path.join(commentFolderPath, `${commentId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadComment", message: error.message };
  }
}

// Method to write an comment to a file
function create(comment) {
  try {
    comment.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(commentFolderPath, `${comment.id}.json`);
    const fileData = JSON.stringify(comment);
    fs.writeFileSync(filePath, fileData, "utf8");
    return comment;
  } catch (error) {
    throw { code: "failedToCreateComment", message: error.message };
  }
}

// Method to update comment in a file
function update(comment) {
  try {
    const currentComment = get(comment.id);
    if (!currentComment) return null;
    const newComment = { ...currentComment, ...comment };
    const filePath = path.join(commentFolderPath, `${comment.id}.json`);
    const fileData = JSON.stringify(newComment);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newComment;
  } catch (error) {
    throw { code: "failedToUpdateComment", message: error.message };
  }
}

// Method to remove an comment from a file
function remove(CommentId) {
  try {
    const filePath = path.join(commentFolderPath, `${commentId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveComment", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
};
