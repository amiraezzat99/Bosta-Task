import { DataTypes } from 'sequelize'
import { sequelizeInstance } from '../connection.js'
import { borrowerModel } from './borrower.model.js'

export const bookModel = sequelizeInstance.define(
  'Book',
  {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ISBN: {
      type: DataTypes.STRING(255)
    },
    available_quantity: {
      type: DataTypes.INTEGER(55),
      allowNull: false,
    },
    shelf_location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    borrowed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
   returned_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    book_status: {
      type: DataTypes.ENUM('borrowed', 'available'),
      allowNull: false,
      defaultValue: 'available'
    },
    is_over_Due: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },

  },
  {
    timestamps: true, // createdAt = registration date , updatedAt
  },
)


// one borrower can borrow many books
// one book can be borrowed by one borrower
bookModel.belongsTo(borrowerModel, {
  foreignKey: 'borrowedBy',
  onDelete: 'No Action',
  onUpdate: 'No Action',
})
// I set it no action because we will need the data of each borrower and book even if one of them deleted
