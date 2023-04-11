//arquivo de conexão com o banco de dados

import { Sequelize } from 'sequelize'

export const database = new Sequelize({
  dialect: 'postgres',
  host: process.env.DATABASE_URL,
  port: 5432,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
	define: {
    underscored: true
  }
})