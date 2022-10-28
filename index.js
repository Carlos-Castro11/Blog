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
  Article.findAll({
    order: [["id", "DESC"]],
  }).then((articles) => {
    Category.findAll().then((categories) => {
      res.render("index", { articles: articles, categories: categories });
    });
  });
});

app.get("/:slug", (req, res) => {
  var slug = req.params.slug;
  Article.findOne({
    where: {
      slug: slug,
    },
  })
    .then((article) => {
      if (article != undefined) {
        Category.findAll().then((categories) => {
          res.render("article", { article: article, categories: categories });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});

app.get("/category/:slug", (req, res) => {
  var slug = req.params.slug;
  Category.findOne({
    where: {
      slug: slug,
    },
    include: [{ model: Article }],
  })
    .then((category) => {
      if (category != undefined) {
        Category.findAll().then((categories) => {
          res.render("index", {
            articles: category.articles,
            categories: categories,
          });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});
