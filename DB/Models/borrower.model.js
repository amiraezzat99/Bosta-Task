import { DataTypes } from 'sequelize'
import { sequelizeInstance } from '../connection.js'

export const borrowerModel = sequelizeInstance.define(
  'Borrower',
  {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(55),
      allowNull: false,
    },
    email:{
        type: DataTypes.STRING(55),
        allowNull: false,  
        unique:true
    },
    password:{
        type: DataTypes.STRING(),
        allowNull: false,
    }
  },
  {
    timestamps: true, // createdAt = registration date , updatedAt
  },
)
