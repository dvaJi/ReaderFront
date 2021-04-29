'use strict';

// User
module.exports = function (sequelize, DataTypes) {
  let RefreshToken = sequelize.define(
    'refresh_tokens',
    {
      token: {
        type: DataTypes.STRING
      },
      created: {
        type: DataTypes.DATE
      },
      createdByIp: {
        type: DataTypes.STRING
      },
      revoked: {
        type: DataTypes.DATE
      },
      revokedBy: {
        type: DataTypes.INTEGER
      }
    },
    {
      timestamps: false
    }
  );

  RefreshToken.associate = function (models) {
    RefreshToken.belongsTo(models.User);
  };

  return RefreshToken;
};
