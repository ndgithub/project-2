module.exports = function (sequelize, DataTypes) {
  var Transaction = sequelize.define("transaction", {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10]
      }
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

  Transaction.associate = function (models) {
    transaction.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Transaction;
};



