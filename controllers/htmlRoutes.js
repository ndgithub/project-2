var db = require("../models");
var path = require("path");

module.exports = function (app) {

  app.get("/main", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/main.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
