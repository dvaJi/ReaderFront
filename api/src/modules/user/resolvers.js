// Imports
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';

// App Imports
import { SECRET_KEY } from './../../config/env';
import serverConfig from '../../config/server';
import { hasPermission } from '../../setup/auth-utils';
import models from '../../setup/models';
import {
  sendActivateEmail,
  sendAccountIsActivatedEmail,
  passwordResetEmail
} from '../../setup/email';
import { roles } from '@shared/params/user';
import { addRegistry, REGISTRY_ACTIONS } from '../registry/resolvers';

// Create
export async function create(
  parentValue,
  { name, email, password },
  { clientIp }
) {
  // Users exists with same email check
  const user = await models.User.findOne({ where: { email } });

  if (!user) {
    // User does not exists
    const usersCount = await models.User.count();

    const passwordHashed = await bcrypt.hash(password, serverConfig.saltRounds);
    const lastLogin = new Date();
    const activateToken = await bcrypt.hash(
      email + lastLogin,
      serverConfig.saltRounds
    );

    const newUser = await models.User.create({
      name,
      email,
      role: usersCount === 0 ? roles.admin : roles.user,
      password: passwordHashed,
      activated: usersCount === 0,
      activatedToken: activateToken,
      lastLogin: lastLogin,
      banned: false,
      bannedReason: null,
      lastIp: clientIp
    });

    if (usersCount > 0) {
      await sendActivateEmail({
        to: newUser.email,
        name: newUser.name,
        token: newUser.activatedToken
      });
    } else {
      await sendAccountIsActivatedEmail({
        to: newUser.email,
        name: newUser.name
      });
    }

    return newUser;
  } else {
    // User exists
    throw new Error(
      `The email ${email} is already registered. Please try to login.`
    );
  }
}

// Activate Account
export async function activate(
  parentValue,
  { email, activatedToken },
  { clientIp }
) {
  if (!email || !activatedToken) {
    throw new Error(`Invalid parameters.`);
  }
  // Users exists with same email check
  const user = await models.User.findOne({ where: { email } });

  if (user) {
    // User exists
    const userDetails = user.get();

    if (userDetails.activated) {
      // User is already activated
      throw new Error(
        `This account is already activated. Please try to login.`
      );
    }

    if (userDetails.activatedToken !== activatedToken) {
      // Token is invalid
      throw new Error(`Token is not valid. Please check your latest email.`);
    }

    const newUser = await models.User.update(
      {
        activated: true,
        activatedToken: null,
        lastIp: clientIp
      },
      { where: { email: email } }
    );

    await sendAccountIsActivatedEmail({
      to: userDetails.email,
      name: userDetails.name
    });

    return newUser;
  } else {
    // User does not exists
    throw new Error(`The email ${email} is not registered. Please signup.`);
  }
}

export async function login(_, { email, password }, { clientIp }) {
  const user = await models.User.findOne({ where: { email } });

  if (!user) {
    // User does not exists
    throw new Error(`Incorrect credentials`);
  } else {
    const userDetails = user.get();

    if (!userDetails.activated) {
      // User need to activate account
      throw new Error(
        `Your account is not activated yet, please check your email.`
      );
    }

    if (userDetails.newPasswordRequested) {
      // User forgot his password
      throw new Error(
        `Your password has been reset, check your email to set a new one.`
      );
    }

    if (userDetails.banned) {
      // User banned
      throw new Error(
        `You have been banned because: ${userDetails.bannedReason}`
      );
    }

    // User exists
    const passwordMatch = await bcrypt.compare(password, userDetails.password);

    if (!passwordMatch) {
      // Incorrect password
      throw new Error(`Incorrect credentials`);
    } else {
      // Update Users info
      await models.User.update(
        {
          lastLogin: new Date(),
          lastIp: clientIp
        },
        { where: { email: email } }
      );

      const userDetailsToken = {
        id: userDetails.id,
        name: userDetails.name,
        email: userDetails.email,
        role: userDetails.role
      };

      const token = jwt.sign(userDetailsToken, SECRET_KEY, {
        expiresIn: '60d'
      });

      await models.RefreshToken.create({
        userId: userDetails.id,
        token,
        created: new Date(),
        createdByIp: clientIp
      });

      return {
        user: userDetails,
        token
      };
    }
  }
}

export async function changePassword(_, { token, newPassword }) {
  let verifiedToken = null;
  try {
    verifiedToken = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new Error(`Token is not valid.`);
  }
  const user = await models.User.findOne({
    where: { email: verifiedToken.email }
  });

  if (user) {
    const userDetail = user.get();

    const password = await bcrypt.hash(newPassword, serverConfig.saltRounds);
    await models.User.update(
      {
        password
      },
      { where: { id: userDetail.id } }
    );

    return {
      message: 'Password has been changed'
    };
  }

  throw new Error(`You cannot perform this action.`);
}

export async function recoverPassword(_, { email }) {
  const user = await models.User.findOne({ where: { email } });

  if (user) {
    const userDetail = user.get();
    const newPasswordToken = jwt.sign({ email }, SECRET_KEY, {
      expiresIn: '1d'
    });

    try {
      await passwordResetEmail({
        to: userDetail.email,
        name: userDetail.name,
        token: newPasswordToken
      });
    } catch (err) {
      console.error(err);
    }
  }

  return {
    message: 'Check your email.'
  };
}

// Get by ID
export async function getById(parentValue, { id }, { auth }) {
  if (await hasPermission('read', auth, 'users')) {
    return await models.User.findOne({ where: { id } });
  } else {
    throw new Error('Operation denied.');
  }
}

// Get all
export async function getAll(parentValue, fields, { auth }) {
  if (await hasPermission('read', auth, 'users')) {
    return await models.User.findAll({
      attributes: {
        exclude: ['password', 'newPasswordToken', 'newPasswordRequested']
      }
    });
  } else {
    throw new Error('Operation denied.');
  }
}

// User genders
export async function getGenders() {
  return {};
}

export async function updateProfile(_, newValues, { auth }) {
  if (auth && auth.user && auth.user.id) {
    const user = await models.User.findOne({ where: { id: auth.user.id } });
    if (!user) {
      throw new Error(`User does not exists`);
    }

    const userDetails = user.get();

    const passwordEquals = await bcrypt.compare(
      newValues.password,
      userDetails.password
    );
    let passwordHashed = '';
    if (newValues.password) {
      passwordHashed = await bcrypt.hash(
        newValues.password,
        serverConfig.saltRounds
      );
    }

    const newUserInfo = Object.keys(newValues).reduce((obj, key) => {
      if (newValues[key]) {
        if (!passwordEquals && key === 'password') {
          obj[key] = passwordHashed;
        } else {
          obj[key] = newValues[key];
        }
      }

      return obj;
    }, {});

    await models.User.update(
      {
        ...newUserInfo
      },
      { where: { id: userDetails.id } }
    );
    await revokeToken({ auth, userId: userDetails.id });

    return { id: userDetails.id };
  } else {
    throw new Error('Operation denied.');
  }
}

// Ban user
export async function ban(_, { id, reason }, { auth }) {
  if (await hasPermission('update', auth, 'users')) {
    const user = await models.User.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User does not exists`);
    } else {
      const userDetail = user.get();
      await addRegistry(
        auth.user.id,
        REGISTRY_ACTIONS.BAN,
        'user',
        userDetail.name
      );
      await models.User.update(
        {
          banned: true,
          bannedReason: reason
        },
        { where: { id } }
      );

      await revokeToken({ auth, userId: userDetail.id });

      return { id };
    }
  } else {
    throw new Error('Operation denied.');
  }
}

// Unban user
export async function unban(_, { id }, { auth }) {
  if (await hasPermission('update', auth, 'users')) {
    const user = await models.User.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User does not exists`);
    } else {
      await models.User.update(
        {
          banned: false,
          bannedReason: null
        },
        { where: { id } }
      );
      await revokeToken({ auth, userId: id });

      return { id };
    }
  } else {
    throw new Error('Operation denied.');
  }
}

export async function changeRole(_, { id, role }, { auth }) {
  if (await hasPermission('update', auth, 'users')) {
    const user = await models.User.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User does not exists`);
    } else if (!isValidRole(role)) {
      throw new Error(`Invalid role`);
    } else {
      await models.User.update(
        {
          role
        },
        { where: { id } }
      );
      await revokeToken({ auth, userId: id });

      return { id };
    }
  } else {
    throw new Error('Operation denied.');
  }
}

export async function getLatestToken(userId) {
  return await models.RefreshToken.findOne({
    where: { [Op.and]: { userId, revoked: { [Op.is]: null } } }
  });
}

export async function revokeToken({ auth, userId }) {
  if (await hasPermission('update', auth, 'users')) {
    await models.RefreshToken.update(
      {
        revoked: new Date(),
        revokedBy: auth.user.id
      },
      { where: { [Op.and]: { userId, revoked: { [Op.is]: null } } } }
    );

    return true;
  }

  return false;
}

const isValidRole = value => ['UPLOADER', 'USER'].includes(value);
