<<<<<<< HEAD
module.exports = function (sequelize, DataTypes) {
  var Transaction = sequelize.define("transaction", {
=======
module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define("Transaction", {
>>>>>>> ce30718ddf88b439aedd3ef68861c8a69c2a5906
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categories: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_ID: {
      type: DataTypes.STRING,
      allowNull: false
    }

  });

<<<<<<< HEAD
  Transaction.associate = function (models) {
    transaction.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
=======
  // Transaction.associate = function(models) {
  //   Transaction.belongsTo(models.User, {
  //     foreignKey: {
  //       allowNull: false

  //     }
  //   });
  // };
>>>>>>> ce30718ddf88b439aedd3ef68861c8a69c2a5906
  return Transaction;
};



