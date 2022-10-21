const Express = require("express");
const router = Express.Router();

router.get("/admin/categories/new", (req, res) => {
  res.render("admin/categories/new");
});

module.exports = router;
