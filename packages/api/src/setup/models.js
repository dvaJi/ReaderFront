import path from 'path';
import Sequelize from 'sequelize';

// App Imports
import databaseConnection from './database';

const MODULES_PATH = path.join(__dirname, '..', 'modules');

const models = {
  User: require(path.join(MODULES_PATH, 'user', 'model'))(
    databaseConnection,
    Sequelize.DataTypes
  ),
  PeopleWorks: require(path.join(MODULES_PATH, 'people-works', 'model'))(
    databaseConnection,
    Sequelize.DataTypes
  ),
  People: require(path.join(MODULES_PATH, 'people', 'model'))(
    databaseConnection,
    Sequelize.DataTypes
  ),
  Page: require(path.join(MODULES_PATH, 'page', 'model'))(
    databaseConnection,
    Sequelize.DataTypes
  ),
  WorksGenres: require(path.join(MODULES_PATH, 'works-genre', 'model'))(
    databaseConnection,
    Sequelize.DataTypes
  ),
  Works: require(path.join(MODULES_PATH, 'works', 'model'))(
    databaseConnection,
    Sequelize.DataTypes
  ),
  Chapter: require(path.join(MODULES_PATH, 'chapter', 'model'))(
    databaseConnection,
    Sequelize.DataTypes
  ),
  Post: require(path.join(MODULES_PATH, 'post', 'model'))(
    databaseConnection,
    Sequelize.DataTypes
  ),
  Archive: require(path.join(MODULES_PATH, 'archive', 'model'))(
    databaseConnection,
    Sequelize.DataTypes
  ),
  Registry: require(path.join(MODULES_PATH, 'registry', 'model'))(
    databaseConnection,
    Sequelize.DataTypes
  ),
  RefreshToken: require(path.join(MODULES_PATH, 'user', 'refresh-token.model'))(
    databaseConnection,
    Sequelize.DataTypes
  )
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = databaseConnection;
models.Sequelize = Sequelize;

export default models;
