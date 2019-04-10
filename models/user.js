module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // id: DataTypes.INTEGER,
<<<<<<< HEAD
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    uuid: DataTypes.STRING,
  });

  User.associate = function (models) {
    User.hasMany(models.transaction, {
      onDelete: "cascade"
    });
  }
=======
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  uuid: DataTypes.STRING,
  password: DataTypes.STRING
});

  // User.associate = function(models) {
  //   User.hasMany(models.Transaction, {
  //     onDelete: "cascade"
  //   });
  // }
>>>>>>> ce30718ddf88b439aedd3ef68861c8a69c2a5906

  return User;
};
