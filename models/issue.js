'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Issue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Issue.init({
    title: DataTypes.STRING,
    summary: DataTypes.STRING,
    author_name: DataTypes.STRING,
    image: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    comments: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER,
    forum_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Issue',
  });
  return Issue;
};