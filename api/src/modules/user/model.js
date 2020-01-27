'use strict';

// User
module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define(
    'users',
    {
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.TEXT
      },
      password: {
        type: DataTypes.TEXT
      },
      role: {
        type: DataTypes.TEXT
      },
      activated: {
        type: DataTypes.BOOLEAN
      },
      activatedToken: {
        type: DataTypes.TEXT
      },
      banned: {
        type: DataTypes.BOOLEAN
      },
      bannedReason: {
        type: DataTypes.TEXT
      },
      newPasswordToken: {
        type: DataTypes.TEXT
      },
      newPasswordRequested: {
        type: DataTypes.BOOLEAN
      },
      lastIp: {
        type: DataTypes.STRING
      },
      lastLogin: {
        type: DataTypes.DATE
      }
    },
    {
      timestamps: false
    }
  );

  return User;
};
