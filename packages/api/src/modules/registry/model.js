'use strict';

// Archives
module.exports = function (sequelize, DataTypes) {
  let Registry = sequelize.define('registry', {
    action: {
      type: DataTypes.STRING
    },
    module: {
      type: DataTypes.STRING
    },
    detail: {
      type: DataTypes.TEXT
    }
  });

  Registry.associate = function (models) {
    Registry.belongsTo(models.User);
  };

  return Registry;
};
