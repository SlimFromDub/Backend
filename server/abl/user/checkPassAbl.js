const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const userDao = require("../../dao/user-dao.js");

const schema = {
    type: "object",
    properties: {  
    id: { type: "string", minLength: 32, maxLength: 32 },
    password: { type: "string", format: "password"},
},
required: ["id","password"],
additionalProperties: false,
};

async function checkPassAbl(req, res) 
{
    try {
        let user = req.body;
        const passCorr = userList.some((u) => u.password === user.password && u.id === user.id);
        if(passCorr)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
 catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = checkPassAbl;