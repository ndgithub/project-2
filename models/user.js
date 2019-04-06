module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // id: DataTypes.INTEGER,
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

  return User;
};
