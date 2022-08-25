'use strict';
const {
  Model
} = require( 'sequelize' );
module.exports = ( sequelize, DataTypes ) => {


  class user extends Model {
    static associate( { vacancy } ) {
      this.belongsToMany( vacancy, { through: 'User_Vacancies' } )
    }
  }
  user.init( {
    user_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    user_login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
      validate: {
        notEmpty: { msg: "The field cannot be empty" }
      }
    },
    user_password: {
      type: DataTypes.STRING,
      allowNULL: false,
      unique: false,
      primaryKey: true,
      validate: {
        notEmpty: { msg: "The field cannot be empty" }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user"
    }
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'user'
  } );
  return user
}