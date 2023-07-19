import { Sequelize } from 'sequelize-typescript';

// Create a Sequelize instance with the database credentials
export const sequelize = new Sequelize({
  database: 'postgres',
  username: 'postgres',
  password: 'root',
  host: 'localhost',
  dialect: 'postgres',
});