// Imports
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/env';

// Authentication middleware
export default function(request, response, next) {
  let authToken = request.headers.authorization;

  if (authToken && authToken !== null) {
    try {
      const token = authToken.split(' ');
      request.user = jwt.verify(token[1], SECRET_KEY);
    } catch (e) {
      console.warn('Invalid token detected.');
      request.user = {};
    }
  } else {
    request.user = {};
  }

  next();
}
