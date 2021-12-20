'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Comment.init({
    comment_id: DataTypes.INTEGER,
    context: DataTypes.STRING,
    rep_comments: DataTypes.JSON,
    user_id: DataTypes.INTEGER,
    issue_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  Comment.removeAttribute('id')
  return Comment;
};