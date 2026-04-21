const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("home", { path: "home" });
});

app.get("/about", (req, res) => {
  res.render("about", { path: "about" });
});

app.get("/portfolio", (req, res) => {
  res.render("portfolio", { path: "portfolio" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { path: "contact" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
