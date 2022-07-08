'use strict';

// WorksGenres
module.exports = function (sequelize, DataTypes) {
  let WorksGenres = sequelize.define('works_genres', {
    genreId: {
      type: DataTypes.INTEGER
    }
  });

  WorksGenres.associate = function (models) {
    WorksGenres.belongsTo(models.Works);
  };

  return WorksGenres;
};
