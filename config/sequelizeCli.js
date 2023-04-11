//Configuração do sequelize

module.exports = {
    development: {
      dialect: 'postgres',
      host: process.env.DATABASE_URL,
      port: '5432',
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    }
  }