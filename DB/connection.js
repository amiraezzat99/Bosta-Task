
import { Sequelize } from 'sequelize'
import { dbConfigration } from '../config/configKeys.js'

export const sequelizeInstance = new Sequelize(
    dbConfigration.db_name,
     dbConfigration.db_username,
     dbConfigration.db_password, 
    {
    host: dbConfigration.db_host,
    dialect: 'mysql',
    }
)

export const dbConnection = async () => {
  return await sequelizeInstance
    .sync({ alter: true , force: false})
    .then((res) => console.log('Connection has been established successfully.'))
    .catch((err) => console.error('Unable to connect to the database:', err))
}