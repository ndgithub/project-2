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

// Gets all transactions for admin
  app.get("/api/all-transactions", function(req, res) {
    db.transaction.findAll().then(function(results) {
      res.json(results);
    });
  });


  app.get("/api", function(req, res) {
    console.log("testing get")
   res.json("test");
  });

  // post transactions
  app.post("/api/transaction", function(req, res) {
    console.log("req.body");
    db.Transaction.create({
      user_ID: req.body.user_ID,
      type: req.body.type,
      amount: req.body.amount,
      categories: req.body.categories
    }).then(function(results) {
      res.json(results) 
    })
    
  });



  app.post("/api/user", function(req, res) {
    console.log(req.body);
    db.User.create({
      firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
   uuid: req.body.uuid,
    }).then(function(results) {
      res.json(results) 
    })
    
  });

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



