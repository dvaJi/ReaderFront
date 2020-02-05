var user = {
  roles: {
    admin: 'ADMIN',
    user: 'USER'
  },
  gender: {
    male: {
      id: 1,
      name: 'Male'
    },
    female: {
      id: 2,
      name: 'Female'
    }
  }
};

exports.roles = user.roles;
exports.gender = user.gender;
