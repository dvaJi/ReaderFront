'use strict';

const bcrypt = require('bcryptjs');
const config = require('../config/server.json');
const params = require('../config/params.json');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'The Admin',
        email: 'admin@weeabo.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        role: params.user.roles.admin,
        activated: true,
        activatedToken: null,
        banned: false,
        bannedReason: null,
        newPasswordToken: null,
        newPasswordRequested: false,
        lastIp: '192.168.0.0',
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The User',
        email: 'user@otaku.uwu',
        password: bcrypt.hashSync('123456', config.saltRounds),
        role: params.user.roles.user,
        activated: true,
        activatedToken: null,
        banned: false,
        bannedReason: null,
        newPasswordToken: null,
        newPasswordRequested: false,
        lastIp: '192.168.0.0',
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The Banned User',
        email: 'user@wotaku.ewe',
        password: bcrypt.hashSync('123456', config.saltRounds),
        role: params.user.roles.user,
        activated: true,
        activatedToken: null,
        banned: true,
        bannedReason: "He didn't follow the rules",
        newPasswordToken: null,
        newPasswordRequested: false,
        lastIp: '192.168.0.0',
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Non Activated User',
        email: 'almostuser@wotaku.ewe',
        password: bcrypt.hashSync('123456', config.saltRounds),
        role: params.user.roles.user,
        activated: false,
        activatedToken: 's0dfsd0fa90sd9a0ak02913012k',
        banned: false,
        bannedReason: null,
        newPasswordToken: null,
        newPasswordRequested: false,
        lastIp: '192.168.0.0',
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The User Who Forgot His Password',
        email: 'forgetful@user.uwu',
        password: bcrypt.hashSync('123456', config.saltRounds),
        role: params.user.roles.user,
        activated: false,
        activatedToken: null,
        banned: false,
        bannedReason: null,
        newPasswordToken: '09766f098234l1230ks012349l',
        newPasswordRequested: true,
        lastIp: '192.168.0.0',
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
