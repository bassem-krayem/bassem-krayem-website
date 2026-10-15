const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const SITE_URL = "https://bassem-krayem.dev";
const RESUME_FILE = "Bassem-Krayem-Junior-Backend-Software-Engineer-CV.pdf";

app.disable("x-powered-by");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public"), { maxAge: "1d" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Shared values for every page (canonical URL for link previews and Google)
app.use((req, res, next) => {
  res.locals.canonical = SITE_URL + req.path;
  next();
});

const pages = {
  home: {
    route: "/",
    view: "home",
    title: "Bassem Krayem | Junior Backend Software Engineer",
    description:
      "Bassem Krayem, a totally blind junior backend software engineer from Tunisia. Node.js, Python, PostgreSQL and MongoDB, with merged open-source contributions to freeCodeCamp and Cloudflare.",
  },
  about: {
    route: "/about",
    view: "about",
    title: "About Me | Bassem Krayem",
    description:
      "My full story: from a Galaxy J2 and audio games to Holberton School and backend engineering.",
  },
  portfolio: {
    route: "/portfolio",
    view: "portfolio",
    title: "Projects and Open Source | Bassem Krayem",
    description:
      "Motamyezon REST API (33 endpoints, 147 automated tests), merged open-source fixes in freeCodeCamp and Cloudflare Docs, and more.",
  },
  contact: {
    route: "/contact",
    view: "contact",
    title: "Contact | Bassem Krayem",
    description:
      "Get in touch with Bassem Krayem about junior backend roles, internships, open source and accessibility.",
  },
};

for (const [key, page] of Object.entries(pages)) {
  app.get(page.route, (req, res) => {
    res.render(page.view, {
      path: key,
      title: page.title,
      description: page.description,
    });
  });
}

app.get("/resume", (req, res) => {
  const filePath = path.join(__dirname, "public", "docs", RESUME_FILE);

  // Tell the browser to display inline (view in browser)
  // and suggest the custom filename for downloads
  res.setHeader(
    "Content-Disposition",
    `inline; filename*=UTF-8''${encodeURIComponent(RESUME_FILE)}`,
  );
  res.contentType("application/pdf");

  res.sendFile(filePath);
});

app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send(`User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
});

app.get("/sitemap.xml", (req, res) => {
  const urls = Object.values(pages)
    .map((page) => `  <url><loc>${SITE_URL}${page.route}</loc></url>`)
    .join("\n");
  res.type("application/xml");
  res.send(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
});

// 404: keep this after every other route
app.use((req, res) => {
  res.status(404).render("404", {
    path: "404",
    title: "Page not found | Bassem Krayem",
    description: "This page does not exist.",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
