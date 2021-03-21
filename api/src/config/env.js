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
export const ADMIN_URL = process.env.ADMIN_URL;
export const API_URL = process.env.API_URL;
export const REACT_APP_APP_TITLE = process.env.REACT_APP_APP_TITLE;

// Email
export const EMAIL_PWD = process.env.EMAIL_PWD;
export const EMAIL = process.env.EMAIL;

// S3 upload file
export const S3_ENDPOINT = process.env.S3_ENDPOINT;
export const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY;
export const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY;
export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
export const USE_S3 =
  S3_ENDPOINT && S3_ACCESS_KEY && S3_SECRET_ACCESS_KEY && S3_BUCKET_NAME;
