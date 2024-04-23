const express = require('express');
const cors = require("cors");
const app = express();
const port = 3000;

const userController = require("./controller/user");
app.use("/user", userController);
const userController = require("./controller/alergen");
app.use("/alergen", userController);
const userController = require("./controller/comment");
app.use("/comment", userController);
const userController = require("./controller/cuisine");
app.use("/cuisine", userController);
const userController = require("./controller/rating");
app.use("/rating", userController);
const userController = require("./controller/recipe");
app.use("/recipe", userController);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello World2!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})