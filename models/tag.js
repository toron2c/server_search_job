'use strict';
const {
  Model
} = require( 'sequelize' );
module.exports = ( sequelize, DataTypes ) => {
  class tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( { vacancy } ) {
      this.belongsToMany( vacancy, { through: 'tagVacancy' } )
    }
  }
  tag.init( {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNULL: false,
      unique: true,
      validate: {
        notEmpty: { msg: "The field cannot be empty" }
      }
    },

  }, {
    sequelize,
    modelName: 'tag',
    tableName: 'tag'
  } );
  return tag;
};