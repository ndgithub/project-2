module.exports = function(sequelize, DataTypes) {
  var transaction = sequelize.define("transactions", {
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
  return transaction;
};

transaction.associate = function(models) {
  transaction.belongsTo(models.user, {
    foreignKey: {
      allowNull: false
    }
  });
};

