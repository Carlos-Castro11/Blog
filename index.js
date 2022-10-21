// IMPORTING
const Express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
// MODELS
const Article = require("./articles/Article");
const Category = require("./categories/Category");

// ACTIVATING
const app = Express();

// LOCALHOST IN DOOR 5000
door = 5000;
app.listen(door, () => {
  console.log("Servidor rodando!");
});

// BODY PARSER
var urlParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// VIEW ENGINE
app.set("view engine", "ejs");

// STATIC
app.use(Express.static("public"));

// DATABASE
connection
  .authenticate()
  .then(() => {
    console.log("Conectado com o banco de dados!");
  })
  .catch((error) => {
    console.log(error);
  });

// ROUTES
app.use("/", categoriesController);
app.use("/", articlesController);

app.get("/", (req, res) => {
  res.render("index");
});
