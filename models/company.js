'use strict';
const {
  Model
} = require( 'sequelize' );
module.exports = ( sequelize, DataTypes ) => {
  class company extends Model {
    static associate( { vacancy } ) {
      this.hasMany( vacancy, { foreignKey: 'company_id' } )
    }
  }

  const model = company.init( {
    company_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    company_login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    company_password: {
      type: DataTypes.STRING,
      allowNULL: false,
      unique: false,
      primaryKey: true,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "company"
    }
  }, {
    sequelize,
    modelName: 'company',
    tableName: 'company'
  } );
  return company
}