'use strict';

const bcrypt = require('bcryptjs');
const config = require('../config/server.json');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'The Admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        role: 'ADMIN',
        activated: true,
        activatedToken: null,
        banned: false,
        bannedReason: null,
        newPasswordToken: null,
        newPasswordRequested: false,
        lastIp: '192.168.0.1',
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
