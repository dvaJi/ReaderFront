'use strict';

// Posts
module.exports = function(sequelize, DataTypes) {
  let Posts = sequelize.define('posts', {
    uniqid: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING
    },
    stub: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.INTEGER
    },
    sticky: {
      type: DataTypes.BOOLEAN
    },
    content: {
      type: DataTypes.TEXT
    },
    category: {
      type: DataTypes.INTEGER
    },
    language: {
      type: DataTypes.INTEGER
    },
    thumbnail: {
      type: DataTypes.STRING
    }
  });

  Posts.associate = function(models) {
    Posts.belongsTo(models.User);
  };

  return Posts;
};
