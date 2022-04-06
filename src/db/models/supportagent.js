'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SupportAgent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SupportAgent.init({
    fullname: DataTypes.STRING,
    department: DataTypes.STRING,
    status: {
      type:   DataTypes.ENUM,
      values: ['free', 'busy']
    } 
  }, {
    sequelize,
    modelName: 'SupportAgent',
  });
  return SupportAgent;
};