// Imports
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// App Imports
import { SECRET_KEY, APP_URL } from './../../config/env';
import serverConfig from '../../config/server';
import params from '../../config/params';
import models from '../../setup/models';
import {
  sendActivateEmail,
  sendAccountIsActivatedEmail
} from '../../setup/email';

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
    const passwordHashed = await bcrypt.hash(password, serverConfig.saltRounds);
    const lastLogin = new Date();
    const activateToken = await bcrypt.hash(
      email + lastLogin,
      serverConfig.saltRounds
    );

    const newUser = await models.User.create({
      name,
      email,
      password: passwordHashed,
      activated: false,
      activatedToken: activateToken,
      lastLogin: lastLogin,
      banned: false,
      bannedReason: null,
      lastIp: clientIp
    });

    await sendActivateEmail({
      siteUrl: APP_URL,
      to: newUser.email,
      name: newUser.name,
      token: newUser.activatedToken
    });

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
      siteUrl: APP_URL,
      to: userDetails.email,
      name: userDetails.name
    });

    return newUser;
  } else {
    // User does not exists
    throw new Error(`The email ${email} is not registered. Please signup.`);
  }
}

export async function login(parentValue, { email, password }, { clientIp }) {
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

      return {
        user: userDetails,
        token: jwt.sign(userDetailsToken, SECRET_KEY, { expiresIn: '60d' })
      };
    }
  }
}

// Get by ID
export async function getById(parentValue, { id }, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return await models.User.findOne({ where: { id } });
  } else {
    throw new Error('Operation denied.');
  }
}

// Get all
export async function getAll(parentValue, fields, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return await models.User.findAll();
  } else {
    throw new Error('Operation denied.');
  }
}

// Delete
export async function remove(parentValue, { id }, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return await models.User.destroy({ where: { id } });
  } else {
    throw new Error('Operation denied.');
  }
}

// User genders
export async function getGenders() {
  return Object.values(params.user.gender);
}
