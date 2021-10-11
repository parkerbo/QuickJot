'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Notebook.associate = function(models) {
    Notebook.hasMany(models.Note, {
			foreignKey: "notebookId",
		});
    Notebook.belongsTo(models.User, {
      foreignKey: 'userId'
    })
  };
  return Notebook;
};
