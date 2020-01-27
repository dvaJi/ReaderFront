// Imports
import dotenv from 'dotenv';

// Load .env
dotenv.config();

// Environment
export const NODE_ENV = process.env.NODE_ENV.trim();

// Port
export const PORT = process.env.PORT || 8000;

// Security
export const SECRET_KEY = process.env.SECRET_KEY;

// GQL Config
export const GRAPHQL_IDE =
  process.env.GRAPHQL_IDE || NODE_ENV === 'development' || false;

// URL
export const APP_URL = process.env.APP_URL;
let API = process.env.API_URL;
if (!API.endsWith('/')) {
  API = process.env.API_URL + '/';
}
export const API_URL = API;
export const REACT_APP_APP_TITLE = process.env.REACT_APP_APP_TITLE;

// Email
export const SENDGRID_API = process.env.SENDGRID_API;
export const EMAIL = process.env.EMAIL;
