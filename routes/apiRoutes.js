var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/:id", function(req, res) {
    db.transaction.findAll(
    {
      where: {
        user_ID: req.params.id
      }
    }).then(function(results) {
      res.json(results);
    });
  });

  app.post("/api/transaction"), function(req, res) {
    db.transaction.create({
      user_ID: req.body.user_ID,
      type: req.body.type,
      amount: req.body.amount,
      categories: req.body.categories
    }).then(function(results) {
      res.json(results) 
    })
  }

  /*
  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
*/



}