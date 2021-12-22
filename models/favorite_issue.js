'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite_Issue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Favorite_Issue.init({
    user_id: DataTypes.INTEGER,
    issue_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favorite_Issue',
  });
  return Favorite_Issue;
};