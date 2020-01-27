'use strict';

// Pages
module.exports = function(sequelize, DataTypes) {
  let Pages = sequelize.define('pages', {
    filename: {
      type: DataTypes.STRING
    },
    hidden: {
      type: DataTypes.BOOLEAN
    },
    height: {
      type: DataTypes.INTEGER
    },
    width: {
      type: DataTypes.INTEGER
    },
    size: {
      type: DataTypes.INTEGER
    },
    mime: {
      type: DataTypes.STRING
    }
  });

  Pages.associate = function(models) {
    Pages.belongsTo(models.Chapter);
  };

  return Pages;
};
