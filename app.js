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
  res.render("home", {
    path: "home",
    title: "Bassem Krayem Backend Software Engineer Home Page",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    path: "about",
    title: "Bassem Krayem Backend Software Engineer About Page",
  });
});

app.get("/portfolio", (req, res) => {
  res.render("portfolio", {
    path: "portfolio",
    title: "Bassem Krayem Backend Software Engineer Portfolio Page",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    path: "contact",
    title: "Bassem Krayem Backend Software Engineer Contact Page",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
