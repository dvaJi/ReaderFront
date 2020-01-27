'use strict';

// People
module.exports = function(sequelize, DataTypes) {
  let People = sequelize.define('peoples', {
    name: {
      type: DataTypes.STRING
    },
    name_kanji: {
      type: DataTypes.STRING
    },
    stub: {
      type: DataTypes.STRING
    },
    uniqid: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    twitter: {
      type: DataTypes.STRING
    },
    thumbnail: {
      type: DataTypes.STRING
    }
  });

  People.associate = function(models) {
    People.hasMany(models.PeopleWorks);
  };

  return People;
};
