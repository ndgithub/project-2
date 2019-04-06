module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define("Transaction", {
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

  Transaction.associate = function(models) {
    Transaction.belongsTo(models.User, {
      foreignKey: {
        allowNull: false

      }
    });
  };
  return Transaction;
};



