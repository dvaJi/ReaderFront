'use strict';

// PeopleWorks
module.exports = function(sequelize, DataTypes) {
  let PeopleWorks = sequelize.define('people_works', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    rol: DataTypes.INTEGER
  });

  PeopleWorks.associate = function(models) {
    PeopleWorks.belongsTo(models.Works);
    PeopleWorks.belongsTo(models.People);
  };

  return PeopleWorks;
};
