const Express = require("express");
const router = Express.Router();

router.get("/articles", (req, res) => {
  res.send("ROTA DE ARTIGOS");
});

router.get("/admin/articles/new", (req, res) => {
  res.send("ROTA PARA CRIAR UM NOVO ARTIGO");
});

module.exports = router;
