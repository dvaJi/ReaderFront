import nodemailer from 'nodemailer';

// App imports
import {
  USE_EMAIL,
  EMAIL_PWD,
  EMAIL,
  ADMIN_URL,
  REACT_APP_APP_TITLE
} from '../config/env';

export function sendActivateEmail({ to, name, token }) {
  if (!USE_EMAIL) {
    return;
  }
  if (to === null || token === null) {
    throw Error('Token or receiver are null');
  }

  const transporter = nodemailer.createTransport(
    `smtps://${encodeURIComponent(EMAIL)}:${encodeURIComponent(
      EMAIL_PWD
    )}@smtp.gmail.com:465`
  );

  // Ex: http://localhost/auth/activate_account?email=example@example.com&token=3x4mpl3t0k3n
  const activationUrl = `${ADMIN_URL}/auth/activate_account?email=${to}&token=${token}`;

  const mailOptions = {
    from: EMAIL,
    to: to,
    subject: 'Activate your account',
    html: `<h1>Hey ${name},</h1><br>We have received a request to activate your account associated with your email address.<br>To confirm this request, please click <a href="${activationUrl}">here</a><br> Or copy and paste this url in your browser: <a href="${activationUrl}">${activationUrl}</a>`
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, err => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

export async function sendAccountIsActivatedEmail({ to, name }) {
  if (!USE_EMAIL) {
    return;
  }
  // Ex: http://localhost/auth/login
  const activationUrl = `${ADMIN_URL}/auth/login`;

  const transporter = nodemailer.createTransport(
    `smtps://${encodeURIComponent(EMAIL)}:${encodeURIComponent(
      EMAIL_PWD
    )}@smtp.gmail.com:465`
  );

  const mailOptions = {
    from: EMAIL,
    to: to,
    subject: 'Account activated',
    html: `<h1>Hey ${name},</h1><br>Your account is activated<br>To use your account please click <a href="${activationUrl}">here</a>`
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, err => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

export function passwordResetEmail({ to, name, token }) {
  if (!USE_EMAIL) {
    return;
  }
  const activationUrl = `${ADMIN_URL}/auth/change_password?token=${token}`;

  const transporter = nodemailer.createTransport(
    `smtps://${encodeURIComponent(EMAIL)}:${encodeURIComponent(
      EMAIL_PWD
    )}@smtp.gmail.com:465`
  );

  const mailOptions = {
    from: EMAIL,
    to: to,
    subject: `Password reset At ${REACT_APP_APP_TITLE}`,
    html: `<h1>Hello ${name},</h1><br/>
    We have just received a request to reset your password at ${REACT_APP_APP_TITLE} and we are here to help you with that!<br/> 
    Simply click on the link to set up a new password for your account: <a href="${activationUrl}">${activationUrl}</a>`
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, err => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}
