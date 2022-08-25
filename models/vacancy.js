'use strict';

const {
  Model
} = require( 'sequelize' );
module.exports = ( sequelize, DataTypes ) => {

  class vacancy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( { company, tag, user } ) {
      this.belongsTo( company, { foreignKey: 'company_id' } )
      this.belongsToMany( user, { through: 'User_Vacancies' } )
      this.belongsToMany( tag, { through: 'tagVacancy' } )
    }
  }
  vacancy.init( {
    vacancy_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: { msg: "The field cannot be empty" }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: { msg: "The field cannot be empty" }
      }
    },
    english_lvl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "The field cannot be empty" }
      }
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "The field cannot be empty" }
      }
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "The field cannot be empty" }
      },
      reference: {
        model: 'company',
        key: 'company_id'
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: { msg: "The field cannot be empty" }
      }
    },
  }, {
    sequelize,
    modelName: 'vacancy',
    tableName: 'vacancy',
  } )
  return vacancy;
}