'use strict';

// Archives
module.exports = function (sequelize, DataTypes) {
  let Archive = sequelize.define('archives', {
    filename: {
      type: DataTypes.STRING
    },
    size: {
      type: DataTypes.INTEGER
    },
    lastDownload: {
      type: DataTypes.DATE
    },
    count: {
      type: DataTypes.INTEGER
    },
    exist: {
      type: DataTypes.BOOLEAN
    }
  });

  Archive.associate = function (models) {
    Archive.belongsTo(models.Chapter);
  };

  return Archive;
};
