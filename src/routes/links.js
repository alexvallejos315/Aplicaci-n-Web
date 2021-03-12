const express = require("express");
const router = express.Router();

const pool = require("../database");

router.get("/add", (req, res) => {
  res.render("../views/links/add.hbs");
});

router.post("/add", async (req, res) => {
  const { title, url, description } = req.body;
  const newlink = { title, url, description, user_id: req.user.id };
  await pool.query("INSERT INTO  links set ?", [newlink]);
  req.flash("success", "Link saved successfully");
  res.redirect("/links");
});

router.get("/", async (req, res) => {
  const links = await pool.query("SELECT * FROM links WHERE user_id=?", [
    req.user.id,
  ]);
  res.render("links/list.hbs", { links });
});

router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM links WHERE ID=?", [id]);
  req.flash("success", "Links removed successfully");
  res.redirect("/links");
});

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const links = await pool.query("SELECT * FROM links WHERE ID=?", [id]);
  res.render("links/edit.hbs", { link: links[0] });
});

router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, url } = req.body;
  const newlink = { title, description, url };
  await pool.query("UPDATE links set ? WHERE id=?", [newlink, id]);
  req.flash("success", "Link Updated Successfully");

  res.redirect("/links");
});

module.exports = router;
