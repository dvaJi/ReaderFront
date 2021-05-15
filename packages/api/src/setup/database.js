// Imports
import { Sequelize } from 'sequelize';

// App Imports
import { NODE_ENV } from '../config/env';
import databaseConfig from '../config/database';

const dbConfig = databaseConfig[NODE_ENV];

// Create new database connection
const connection = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: 'mysql',
    logging: NODE_ENV === 'development' ? console.info : false,
    operatorsAliases: Sequelize.Op
  }
);

// Test connection
console.info('SETUP - Connecting database...');

connection
  .authenticate()
  .then(() => {
    console.info('INFO - Database connected.');
  })
  .catch(err => {
    console.error('ERROR - Unable to connect to the database:', err);
  });

export default connection;
