var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/transactions/:id", function(req, res) {
    console.log(req.params.id);
    db.Transaction.findAll({
      where: {
        user_ID: req.params.id
      }
    }).then(function(results) {
      res.json(results);
    });
  });

  app.get("/api/transaction-deposit/:id", function(req, res) {
    console.log(req.params.id);
    db.Transaction.findAll({
      where: {
        type: "Deposit",
        user_ID: req.params.id
      }
    }).then(function(results) {
      res.json(results);
    });
  });

  app.get("/api/transaction-withdrawl/:id", function(req, res) {
    console.log(req.params.id);
    db.Transaction.findAll({
      where: {
        type: "Withdrawl",
        user_ID: req.params.id
      }
    }).then(function(results) {
      res.json(results);
    });
  });

  app.get("/api/users", function(req, res) {
    db.User.findAll().then(function(results) {
      res.json(results);
    });
  });

  // Gets all transactions for admin
  app.get("/api/all-transactions", function(req, res) {
    db.Transaction.findAll().then(function(results) {
      res.json(results);
    });
  });


  app.get("/api/budget", function(req, res) {
    console.log(req.params.id);
    db.Transaction.findAll().then(function(results) {
      res.json(results);
    });
  });

  // post transactions
  app.post("/api/transactions", function(req, res) {
    console.log("req.body");
    db.Transaction.create({
      user_ID: req.body.user_ID,
      type: req.body.type,
      amount: req.body.amount,
      categories: req.body.categories
    }).then(function(results) {
      res.json(results);
    });
  });

  app.post("/api/users", function(req, res) {
    console.log(req.body);
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }).then(function(results) {
      res.json(results);
    });
  });
   app.post("/auth", function (req, res) {
    db.User.findAll(
      {
        where: {
          username: req.body.username
        }
      }).then(function (results) {
        var authObj = { authorized: null };
        if (results.length === 0) {
          authObj.authorized = false;
          return res.json(authObj);
        }
        if (results[0].password === req.body.password) {
          authObj.authorized = true;
          return res.json(authObj);
        } else {
          authObj.authorized = false;
          return res.json(authObj);
        }
      });
  });
};

 


